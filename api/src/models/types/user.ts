export interface IUser {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  alias: string;
  password: string;
  managerAlias?: string;
  department: string;
  lastLogon: Date;
  permissions: string[];
}
