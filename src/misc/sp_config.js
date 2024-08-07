import {PAGE_URL} from './setup';
export const CLIENT_ID = 'cd94803c352d41ebb5ccb110b98f6e89';
export const REDIRECT_URI = `${PAGE_URL}/callback`;
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const RESPONSE_TYPE = 'code';
export const SCOPES = "user-read-private user-read-email playlist-read-private user-top-read playlist-modify-public playlist-modify-private"