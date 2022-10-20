export * from './styles';

export interface ReactParent extends Record<string, any> {
  children?: any;
}

export type IRoutes = IRoute[];
export interface IRoute {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  route?: string;
  href?: string;
  isDropDown?: boolean;
  isFormMenu?: boolean;
  routes?: IRoutes;
}
