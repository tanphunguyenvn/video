import restClient from './restClient';

export const getAllVideo = async() => {
  const url = '/shares';
  
  return restClient.get(url);
};

export const signInUser = async(payload: any) => {
  const url = '/sign-in';
  
  return restClient.post(url, payload);
};
