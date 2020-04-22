import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  var db = client.db('learningwidan');
  db.collection('briefs').insertMany([
    { id: 1, lessonName: 'Creative Thinking', briefName: 'Game of Prints',
      description: `
This product is a classroom tool that scaffolds higher order thinking. Its a collaborative strategy that using building bricks to help structure students ideas. Learners build knowledge structures with information (attached to different coloured bricks). Students desks are turned into workshops where they physically manipulate information into meaningful creations. They show sequences of information (like stories), rank information by importance and pretty much all other essential cognitive skills you need at school. The end result is clarity in thought and better collaborative conversations. I want this to be marketed as a sophisticated knowledge tool applicable to all ages and subjects. It gives students the cognitive edge, they get a little more 'RAM'!.

I want to continue with the construction/building theme as well as the mind/brain/learning theme. They need to be blended somehow. Teachers find it easier to talk about building/scaffolding analogies as its less abstract.
      `,
      answerIds: [101, 102] },
    { id: 2, lessonName: 'From Brief To Concept', briefName: 'Converting Message Line into Concept Line',
      description: `
Educating people about sustainable food production
      `,
      answerIds: [] },
    { id: 3, lessonName: 'Video Self-Production', briefName: 'Holiday Video With a Message',
    description: `
Data is created at every touch point in a notes life-cycle. Because of the volume of the data, it can be difficult to store, analyse and gain insight. Collecting, processing and analysing the data using big data technologies and displaying the results in an interactive display makes it easy to make informative decisions, overcome problem and plan for the future.

It works using big data technologies and displays the results in modern browsers, combining powerful visualisation components and a data-driven approach to interact with the data.

It enables you to analyse data that were not previously possible. The volume, variety, complexity of the analytical processing involved, and the responsiveness required are now achievable with the product. Gaining smarter decision making but also provide faster time to value.
    `,
    answerIds: [103, 104, 105] },
    { id: 4, lessonName: 'Guerilla Advertising', briefName: 'The Candy Machine Challenge',
    description: `
A list of free online programming books, categorized by languages/topics
    `,
    answerIds: [] }
  ]).then(response => {
    console.info('Briefs', response.insertedCount);
    db.collection('answers').insertMany([
      { id: 101, answer: 'Mind Assembly', timestamp: new Date() },
      { id: 102, answer: 'Brain Scaffold', timestamp: new Date() },
      { id: 103, answer: 'Cash View', timestamp: new Date() },
      { id: 104, answer: 'Currency Map', timestamp: new Date() },
      { id: 105, answer: 'Cash Board', timestamp: new Date() },
      { id: 106, answer: 'RootLib', timestamp: new Date() },
    ]).then(response => {
      console.info('Answers', response.insertedCount);
      db.close();
    });
  });
});
