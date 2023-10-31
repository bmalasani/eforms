import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

export const getStats = async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    res.status(200).send({
      requests: Math.floor(100 * Math.random() * Math.random()),
      approvals: Math.floor(100 * Math.random() * Math.random()),
      actions: Math.floor(100 * Math.random() * Math.random()),
      drafts: Math.floor(100 * Math.random() * Math.random()),
    });
  }
};

router.route('/:userId').get(getStats);

export default router;
