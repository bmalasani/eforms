import mongoose from 'mongoose';
import { FormSchema, IFormDoc, IUserDoc, UserSchema } from './schemas';

export const models = {
  Users: mongoose.model<IUserDoc>('users', UserSchema),
  Forms: mongoose.model<IFormDoc>('forms', FormSchema),
};
