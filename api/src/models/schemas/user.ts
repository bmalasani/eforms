import { Schema, Document, SchemaTypeOptions } from 'mongoose';
import { randomUUID } from 'crypto';
import { IUser } from '../types';

const UserSchemaFields: Record<keyof IUser, SchemaTypeOptions<any>> = {
  firstName: String,
  lastName: String,
  alias: String,
  department: String,
  lastLogon: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  managerAlias: String,
  password: String,
  permissions: {
    type: [String],
  },
  uuid: {
    type: String,
    default: randomUUID,
  },
};

export interface IUserDoc extends IUser, Document {}
export const UserSchema = new Schema(UserSchemaFields);
