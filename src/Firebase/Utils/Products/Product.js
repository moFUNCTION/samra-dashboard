import { AddProduct } from "./AddProduct";
import { GetProduct } from "./GetProduct";
import { UpdateProduct } from "./UpdateProduct";
import { DeleteProduct } from "./DeleteProduct";
export class Product {
  constructor({
    title,
    description,
    sizes,
    images,
    availabilityType,
    time,
    categoryId,
  }) {
    this.title = title;
    this.description = description;
    this.images = images;
    this.availabilityType = availabilityType;
    this.sizes = sizes;
    this.time = time;
    this.categoryId = categoryId;
  }
  #getAllParams() {
    return {
      title: this.title,
      description: this.description,
      images: this.images,
      availabilityType: this.availabilityType,
      sizes: this.sizes,
      time: this.time,
      categoryId: this.categoryId,
    };
  }
  async add({ onUploadProgress }) {
    const AddCategoryInit = new AddProduct({
      ...this.#getAllParams(),
      onUploadProgress,
    });
    const req = await AddCategoryInit.CreateRequist();
    return req;
  }
  async update({ id, onUploadProgress }) {
    const UpdateCategoryInit = new UpdateProduct({
      ...this.#getAllParams(),
      categoryId: this.categoryId,
      productId: id,
      onUploadProgress,
    });
    const req = await UpdateCategoryInit.updateReq();
    return req;
  }
  async get({ id }) {
    const req = await GetProduct({ productId: id });
    return req;
  }
  async delete({ id }) {
    const req = await DeleteProduct({ productId: id });
    return req;
  }
}
