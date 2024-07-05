import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UploadFiles } from "../../lib/UploadFiles";
import { db } from "../../Config/Config";
Array.prototype.findMaxNumber = function () {
  let maxNumber = this[0];
  for (let i = 0; i <= this.length; i++) {
    if (maxNumber < this[i]) {
      maxNumber = this[i];
    }
  }
  return maxNumber;
};
Array.prototype.findMinNumber = function () {
  let minNumber = this[0];
  for (let i = 0; i <= this.length; i++) {
    if (minNumber > this[i]) {
      minNumber = this[i];
    }
  }
  return minNumber;
};
export class AddProduct {
  #collection = "Products";
  constructor({
    title,
    description,
    images,
    availabilityType,
    sizes,
    time,
    categoryId,
    onUploadProgress,
  }) {
    this.title = title;
    this.description = description;
    this.images = images.map((image) => {
      return image.value;
    });
    this.availabilityType = availabilityType;
    this.searchKey = title.toUpperCase();
    this.sizes = sizes;
    this.time = time;
    this.categoryId = categoryId;
    this.onUploadProgress = onUploadProgress;
  }
  async #uploadImages() {
    const StoragePath = "products";
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
    function TransformSizesToObject(sizes) {
      const transformObject = {};
      for (let size of sizes) {
        transformObject[size.size] = size.price;
      }
      return transformObject;
    }
    const prices = this.sizes.map((size) => {
      return size.price;
    });
    const sizesQuery = TransformSizesToObject(this.sizes);
    const req = await addDoc(categortiesRef, {
      createdAt: serverTimestamp(),
      title: this.title,
      searchKey: this.searchKey,
      description: this.description,
      images,
      availabilityType: this.availabilityType,
      sizes: this.sizes,
      time: this.time,
      categoryId: this.categoryId,
      likesCount: 0,
      purchasedCount: 0,
      sizesQuery,
      biggestPrice: prices.findMaxNumber(),
      smallestPrice: prices.findMinNumber(),
    });
    return req;
  }
  async CreateRequist() {
    try {
      const images = await this.#uploadImages();
      const saveToDbReq = await this.#AddToFirestore({ images });
      return saveToDbReq;
    } catch (err) {
      console.log(err);
      throw new Error(err.code || err);
    }
  }
}
