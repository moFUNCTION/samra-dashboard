import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UploadFiles } from "../../lib/UploadFiles";
import { db } from "../../Config/Config";

export class AddCategory {
  #collection = "Categories";
  constructor({
    title,
    description,
    images,
    availabilityType,
    onUploadProgress,
  }) {
    this.title = title;
    this.description = description;
    this.images = images.map((image) => {
      return image.value;
    });
    this.availabilityType = availabilityType;
    this.searchKey = title.toUpperCase();
    this.onUploadProgress = onUploadProgress;
  }
  async #uploadImages() {
    const StoragePath = "categories";
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
    const categortiesRef = collection(db, this.#collection);
    const req = await addDoc(categortiesRef, {
      createdAt: serverTimestamp(),
      title: this.title,
      searchKey: this.searchKey,
      description: this.description,
      images,
      availabilityType: this.availabilityType,
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
