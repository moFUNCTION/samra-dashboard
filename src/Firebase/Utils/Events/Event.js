import { AddEvent } from "./AddEvent";
import { GetEvent } from "./GetEvent";
import { UpdateEvent } from "./UpdateEvent";
import { DeleteEvent } from "./DeleteEvent";

export class Event {
  constructor({ images, title, description, href }) {
    this.title = title;
    this.images = images;
    this.description = description;
    this.href = href;
  }
  #getAllParams() {
    return {
      title: this.title,
      description: this.description,
      images: this.images,
      href: this.href,
    };
  }
  async add({ onUploadProgress }) {
    const AddCategoryInit = new AddEvent({
      ...this.#getAllParams(),
      onUploadProgress,
    });
    const req = await AddCategoryInit.CreateRequist();
    return req;
  }
  async update({ id, onUploadProgress }) {
    const UpdateCategoryInit = new UpdateEvent({
      ...this.#getAllParams(),
      eventId: id,
      onUploadProgress,
    });
    const req = await UpdateCategoryInit.updateReq();
    return req;
  }
  async get({ id }) {
    const req = await GetEvent({ eventId: id });
    return req;
  }
  async delete({ id }) {
    const req = await DeleteEvent({ eventId: id });
    return req;
  }
}
