import express from 'express';
import { MongoClient } from 'mongodb';
import { strict as assert } from 'assert';
import config from '../config';


let mdb;
MongoClient.connect(config.mongodbUri, { useUnifiedTopology: true, useNewUrlParser: true,}, (err, client) => {
  assert.equal(null, err);
  mdb = client.db(config.mongodbDB);
});

const router = express.Router();


router.get('/briefs', (req, res) => {
  let briefs = {};
  mdb.collection('briefs').find({})
    .project({
      id:1,
      lessonName:1,
      briefName:1
    })
    .each((err, brief) => {
      assert.equal(null, err);
      if(!brief){
        res.send({briefs});
        return;
      }
      briefs[brief.id] = brief;
    });
});

router.get('/briefs/:briefId', (req, res) => {
  mdb.collection('briefs').findOne({ id: Number(req.params.briefId) })
    .then(brief => res.send(brief))
    .catch(console.error);
});


router.get('/answers/:answerIds', (req, res) => {
  const nameIds = req.params.answerIds.split(',').map(Number);
  let answers = {};
  mdb.collection('answers').find({ id: {$in: nameIds} })
    .each((err, answer) => {
      assert.equal(null, err);
      if(!answer){
        res.send({answers});
        return;
      }
      answers[answer.id] = answer;
    });
});



export default router;

