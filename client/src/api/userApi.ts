import restClient from './restClient';

export const signUpUser = async(payload: any) => {
  const url = '/sign-up';
  
  return restClient.post(url, payload);
};

export const signInUser = async(payload: any) => {
  const url = '/sign-in';
  
  return restClient.post(url, payload);
};
