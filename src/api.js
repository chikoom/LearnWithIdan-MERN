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