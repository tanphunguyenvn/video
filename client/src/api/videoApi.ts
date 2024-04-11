import restClient from './restClient';

export const getAllVideo = async() => {
  const url = '/shares';
  
  return restClient.get(url);
};

export const createVideo = async(payload: any) => {
  const url = '/shares';
  
  return restClient.post(url, payload);
};
