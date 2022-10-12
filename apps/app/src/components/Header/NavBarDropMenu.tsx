import React from 'react';
import { IRoutes } from '../../types';

export interface NavBarProps {
  routes?: IRoutes;
  logo: JSX.Element;
  onSearch?: Function;
}

function NavBar({ routes = [], logo, onSearch }: NavBarProps) {
  return <div>NavBar</div>;
}

export default NavBar;
