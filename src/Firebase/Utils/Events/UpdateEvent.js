import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Config/Config";
import { deleteObject, ref } from "firebase/storage";
import { arraysEqual } from "../../lib/arraysEqual";
import { UploadFiles } from "../../lib/UploadFiles";
import { GetEvent } from "./GetEvent";
export class UpdateEvent {
  #collection = "Events";
  constructor({ title, description, images, onUploadProgress, eventId, href }) {
    this.title = title;
    this.description = description;
    this.images = images;
    this.onUploadProgress = onUploadProgress;
    this.href = href;
    this.eventId = eventId;
  }
  async #UpdateImages({ prevImages }) {
    let newImages = [];
    const existingImagesMap = new Map();

    // Separate files to be uploaded and existing images
    const filesToUpload = [];
    for (const image of this.images) {
      if (image.value instanceof File) {
        filesToUpload.push(image.value);
      } else {
        existingImagesMap.set(image.URL, image);
        newImages.push(image);
      }
    }

    // Upload new images to Firebase Storage
    if (filesToUpload.length > 0) {
      const uploadResults = await UploadFiles({
        files: filesToUpload,
        StoragePath: "events",
        onUploadProgress: ({ progress, fileName, state }) => {
          this.onUploadProgress({ progress, fileName, state });
        },
      });

      newImages = [
        ...newImages,
        ...uploadResults.map((result) => ({
          URL: result.URL,
          Path: result.Path,
        })),
      ];
    }

    // Determine images to delete
    const imagesToDelete = prevImages.filter(
      (prevImage) => !existingImagesMap.has(prevImage.URL)
    );

    // Delete images from Firebase Storage
    await Promise.all(
      imagesToDelete.map(async (image) => {
        if (image.URL && image.Path) {
          const storageRef = ref(storage, image.Path);
          await deleteObject(storageRef);
        }
      })
    );

    return newImages;
  }
  async #UpdateDataInFirestore({ newImages = [] }) {
    const EventDoc = doc(db, this.#collection, this.eventId);
    const DataSaved = {
      title: this.title,
      description: this.description,
      href: this.href,
    };
    if (newImages.length >= 1) {
      DataSaved.images = newImages;
    }
    const updateReq = await updateDoc(EventDoc, {
      ...DataSaved,
      updatedAt: serverTimestamp(),
    });
    return updateReq;
  }
  async updateReq() {
    const prevData = await GetEvent({ eventId: this.eventId });
    try {
      if (
        !this.images.find((image) => image.value instanceof File) &&
        arraysEqual(prevData.images, this.images)
      ) {
        const updateReq = await this.#UpdateDataInFirestore({});
        return updateReq;
      }
      const newImages = await this.#UpdateImages({
        prevImages: prevData.images,
      });
      const updateReq = await this.#UpdateDataInFirestore({ newImages });
      return updateReq;
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}
