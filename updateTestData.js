import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  var db = client.db('learningwidan');

  let briefCount = 0;
  db.collection('briefs').find({}).each((err, brief) => {
    assert.equal(null, err);
    if (!brief) { return; }

    briefCount++;
    db.collection('answers')
      .find({ id: { $in: brief.answerIds }})
      .project({ _id: 1 })
      .toArray()
      .then(_ids => {
        const newIds = _ids.map(o => o._id);
        db.collection('briefs').updateOne(
          { id: brief.id },
          { $set: { answerIds: newIds } }
        ).then(() => {
          console.info('Updated', brief._id);
          briefCount--;
          if (briefCount === 0) { db.close(); }
        });
      })
      .catch(console.error);
  });

});
