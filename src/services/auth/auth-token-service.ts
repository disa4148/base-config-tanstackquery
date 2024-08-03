import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (token: string): void => {
  console.log('Setting access token:', token);
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 1 / 48,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getAccessToken = (): string | undefined => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  console.log('Getting access token:', token);
  return token;
};

export const removeFromStorage = (): void => {
  console.log('Removing tokens from storage');
  Cookies.remove(ACCESS_TOKEN_KEY);
};

export const saveToStorage = (tokens: { accessToken: string }): void => {
  setAccessToken(tokens.accessToken);
};

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
}
