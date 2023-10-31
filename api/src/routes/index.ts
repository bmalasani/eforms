import express, { Router } from 'express';
import userRouter from './user';
import formRouter from './form';
import statsRouter from './stats';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/form',
    route: formRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/stats',
    route: statsRouter,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
