import { models } from '../../models';
import { IUser } from '../../models/types';

export class UsersDataSource {
  async getUser(id: any) {
    return await models.Users.findOne({ alias: id });
  }
  async getUsers() {
    return await models.Users.find({});
  }
  async createUser(user: IUser) {
    const newForm = new models.Users({ ...user });
    return await newForm.save();
  }
  async updateUser(user: IUser) {
    const newForm = new models.Users({ ...user });
    return await newForm.save();
  }
  loginUser(user: any) {
    return { token: 'string' };
  }
}
