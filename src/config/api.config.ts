export const SERVER_URL: string = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

export const API_URL = {
  root: (url = ''): string => `${SERVER_URL}${url}`,
  auth: (url = ''): string => API_URL.root(`/auth${url}`),
  users: (url = ''): string => API_URL.root(`/users${url}`),
};
