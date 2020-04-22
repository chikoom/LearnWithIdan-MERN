import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
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
      lessonName:1,
      briefName:1
    })
    .each((err, brief) => {
      assert.equal(null, err);
      if(!brief){
        res.send({briefs});
        return;
      }
      briefs[brief._id] = brief;
    });
});

router.get('/briefs/:briefId', (req, res) => {
  mdb.collection('briefs').findOne({ _id: ObjectID(req.params.briefId) })
    .then(brief => res.send(brief))
    .catch(console.error);
});


router.get('/answers/:answerIds', (req, res) => {
  const nameIds = req.params.answerIds.split(',').map(ObjectID);
  let answers = {};
  mdb.collection('answers').find({ _id: {$in: nameIds} })
    .each((err, answer) => {
      assert.equal(null, err);
      if(!answer){
        res.send({answers});
        return;
      }
      answers[answer._id] = answer;
    });
});



router.post('/answers', (req,res) => {
  const answer = req.body.newAnswer;
  const briefId = ObjectID(req.body.briefId);
  // Validation ...
  mdb.collection('answers').insertOne({ answer }).then( result => 
    mdb.collection('briefs').findOneAndUpdate(
      { _id: briefId },
      { $push: { answerIds: result.insertedId } },
      { returnOriginal: false }
    ).then( doc => 
      res.send({
        updatedBrief: doc.value,
        newAnswer: { _id: result.insertedId, answer}
      })
    )
  )
    .catch(error => {
      console.error(error);
      res.status(404).send('Couldn\'t update the answer...');
    });
});


export default router;

