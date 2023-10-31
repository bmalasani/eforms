import { models } from '../../models';
import { IForm } from '../../models/types';

export class FormsDataSource {
  async getForm(id: any) {
    return await models.Forms.findOne({ formId: id });
  }
  async getForms() {
    return await models.Forms.find({});
  }
  async createForm(form: IForm) {
    const newForm = new models.Forms({ ...form });
    return await newForm.save();
  }
  async updateForm(form: IForm) {
    const newForm = new models.Forms({ ...form });
    return await newForm.save();
  }
}
