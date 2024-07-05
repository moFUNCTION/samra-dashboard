import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UploadFiles } from "../../lib/UploadFiles";
import { db } from "../../Config/Config";

export class AddEvent {
  #collection = "Events";
  constructor({ title, description, images, onUploadProgress, href }) {
    this.title = title;
    this.description = description;
    this.images = images.map((image) => {
      return image.value;
    });
    this.href = href;
    this.onUploadProgress = onUploadProgress;
  }
  async #uploadImages() {
    const StoragePath = "events";
    const images = await UploadFiles({
      files: this.images,
      StoragePath,
      onUploadProgress: ({ progress, fileName, state }) => {
        this.onUploadProgress({ progress, fileName, state });
      },
    });
    return images;
  }
  async #AddToFirestore({ images }) {
    console.log(this.title, this.href, this.description, this.images);
    const EventsRef = collection(db, this.#collection);
    const req = await addDoc(EventsRef, {
      createdAt: serverTimestamp(),
      title: this.title,
      description: this.description,
      images,
      href: this.href,
    });
    return req;
  }
  async CreateRequist() {
    try {
      const images = await this.#uploadImages();
      const saveToDbReq = await this.#AddToFirestore({ images });
      return saveToDbReq;
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}
