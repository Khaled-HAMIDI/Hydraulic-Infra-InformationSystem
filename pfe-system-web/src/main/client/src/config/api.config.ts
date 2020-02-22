import {environment} from '../environments/environment';

export const PROTOCOL: string = 'http://';
export const DOMAIN: string = environment.domain;
export const API_DB_JSON: string = PROTOCOL + DOMAIN + ':3000';
export const BACKEND: string = PROTOCOL + DOMAIN + '/api';
export const API: string = BACKEND;
export const WINDOWS_SERVICE: string = PROTOCOL +  'localhost:5000/api/Hardware';
