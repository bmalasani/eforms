import express, { Request, Response, Router } from 'express';
import { UsersDataSource } from '../graph/datasources';

const router: Router = express.Router();
const usersDataSource = new UsersDataSource();

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await usersDataSource.createUser(req.body);
  res.status(200).send(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await usersDataSource.getUsers();
  res.status(200).send(result);
};

export const getUser = async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await usersDataSource.getUser(req.params['userId']);
    if (!user) {
      res.status(500).send({});
    } else {
      res.send(user);
    }
  }
};

router.route('/').post(createUser).get(getUsers);

router.route('/:userId').get(getUser);

export default router;
