import express from 'express';
import data from '../src/testData.json';

const router = express.Router();
const briefs = data.briefs.reduce((obj, brief) => {
  obj[brief.id] = brief;
  return obj;
},{});

router.get('/briefs', (req, res) => {
  res.send({briefs});
});

router.get('/briefs/:briefId', (req, res) => {
  let brief = briefs[req.params.briefId];
  brief.description = 'This is the brief description';
  res.send(brief);
});

export default router;

