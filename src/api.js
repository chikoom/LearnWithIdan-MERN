import axios from 'axios';

export const fetchBrief = briefId => {
  return axios.get(`/api/briefs/${briefId}`)
    .then( resp => resp.data)
    .catch(console.error);
};


export const fetchBriefList = () => {
  return axios.get('/api/briefs/')
    .then( resp => resp.data.briefs)
    .catch(console.error);
};


export const fetchAnswers = answerIds => {
  return axios.get(`/api/answers/${answerIds.join(',')}`)
    .then( resp => resp.data.answers)
    .catch(console.error);
};

export const addAnswer = (newAnswer, briefId) => {
  return axios.post('/api/answers/', { newAnswer,briefId })
    .then( resp => resp.data)
    .catch(console.error);
};
