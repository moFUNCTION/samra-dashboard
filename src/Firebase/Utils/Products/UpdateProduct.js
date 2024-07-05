import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Config/Config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { GetProduct } from "./GetProduct";
import { arraysEqual } from "../../lib/arraysEqual";
import { UploadFiles } from "../../lib/UploadFiles";

export class UpdateProduct {
  #collection = "Products";
  constructor({
    title,
    time,
    sizes,
    description,
    images,
    availabilityType,
    categoryId,
    productId,
    onUploadProgress,
  }) {
    this.title = title;
    this.description = description;
    this.images = images;
    this.sizes = sizes;
    this.time = time;
    this.availabilityType = availabilityType;
    this.searchKey = title.toUpperCase();
    this.categoryId = categoryId;
    this.productId = productId;
    this.onUploadProgress = onUploadProgress;
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
        StoragePath: "products",
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
    const productDoc = doc(db, this.#collection, this.productId);
    const DataSaved = {
      title: this.title,
      description: this.description,
      availabilityType: this.availabilityType,
      searchKey: this.searchKey,
      sizes: this.sizes,
      time: this.time,
      categoryId: this.categoryId,
    };
    if (newImages.length >= 1) {
      DataSaved.images = newImages;
    }
    const updateReq = await updateDoc(productDoc, {
      ...DataSaved,
      updatedAt: serverTimestamp(),
    });
    return updateReq;
  }
  async updateReq() {
    const prevData = await GetProduct({ productId: this.productId });
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
