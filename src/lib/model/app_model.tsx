import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.PB_URL);
pb.autoCancellation(false);

class AppModel {
  collection: string;

  constructor(collection_name: string) {
    this.collection = collection_name;
  }

  async findById(id: string, conditions: any = null) {
    try {
      const res = await pb.collection(this.collection).getOne(id, conditions);
      return res;
    } catch (error) {
      return error;
    }
  }

  async findOne(conditions: any = null) {
    try {
      const res = await pb
        .collection(this.collection)
        .getFirstListItem(conditions);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findAll(conditions: any = null) {
    const res = await pb.collection(this.collection).getFullList(conditions);
    return res;
  }

  async findPaginated(page: number = 1, limit: number, conditions: any = null) {
    limit = limit ?? 10;
    try {
      const res = await pb
        .collection(this.collection)
        .getList(page, limit, conditions);
      return res;
    } catch (error) {
      return error;
    }
  }

  async save(data: any) {
    try {
      const res = await pb.collection(this.collection).create(data);
      return res;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, data: any) {
    const isExists = await pb.collection(this.collection).getOne(id);
    if (!isExists) {
      return { message: "Not Found", status: 404 };
    }
    try {
      const res = await pb.collection(this.collection).update(id, data);
      return res;
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
    const isExists = await pb.collection(this.collection).getOne(id);
    if (!isExists) {
      return { message: "Not Found", status: 404 };
    }
    try {
      const res = await pb.collection(this.collection).delete(id);
      return res;
    } catch (error) {
      return error;
    }
  }
}

export default AppModel;
export { pb };
