import express from 'express';
import data from '../src/testData.json';

const router = express.Router();

router.get('/briefs', (req, res) => {
  res.send({ briefs: data.briefs });
});

export default router;