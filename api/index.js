import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Router Data');
});

export default router;