import { json } from 'body-parser';
import express, { Request, Response, Router } from 'express';
import { FormsDataSource } from '../graph/datasources';

const router: Router = express.Router();
const formsDataSource = new FormsDataSource();

const createForm = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await formsDataSource.createForm(req.body);
  res.status(200).send(user);
};

export const getForms = async (req: Request, res: Response) => {
  const result = await formsDataSource.getForms();
  res.status(200).send(result);
};

export const getForm = async (req: Request, res: Response) => {
  if (typeof req.params['formId'] === 'string') {
    const user = await formsDataSource.getForm(req.params['formId']);
    if (!user) {
      res.status(500).send({});
    } else {
      res.send(user);
    }
  }
};

router.route('/').post(createForm).get(getForms);

router.route('/:formId').get(getForm);

export default router;
