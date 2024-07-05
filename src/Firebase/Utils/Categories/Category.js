import { AddCategory } from "./AddCategory";
import { DeleteCategory } from "./DeleteCategory";
import { UpdateCategory } from "./UpdateCategory";
import { getCategory } from "./getCategory";
export class Category {
  constructor({
    title = null,
    description = null,
    images = [],
    availabilityType = "public",
  }) {
    this.title = title;
    this.description = description;
    this.images = images;
    this.availabilityType = availabilityType;
  }
  #getAllParams() {
    return {
      title: this.title,
      description: this.description,
      images: this.images,
      availabilityType: this.availabilityType,
    };
  }
  async add({ onUploadProgress }) {
    const AddCategoryInit = new AddCategory({
      ...this.#getAllParams(),
      onUploadProgress,
    });
    const req = await AddCategoryInit.CreateRequist();
    return req;
  }
  async update({ id, onUploadProgress }) {
    const UpdateCategoryInit = new UpdateCategory({
      ...this.#getAllParams(),
      categoryId: id,
      onUploadProgress,
    });
    const req = await UpdateCategoryInit.updateReq();
    return req;
  }
  async get({ id }) {
    const req = await getCategory({ categoryId: id });
    return req;
  }
  async delete({ id }) {
    const req = await DeleteCategory({ categoryId: id });
    return req;
  }
}
