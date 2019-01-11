export const APP_PORT = process.env.PORT || 3000;
export const APP_URL = process.env.APP_URL || 'http://127.0.0.1';
export const GITHUB_CLIENT_CALLBACK = process.env.APP_URL ? `${APP_URL}auth/github/callback` : `${APP_URL}:${APP_PORT}/auth/github/callback`;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '9c4f417b783064bea1d8';
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '53d3a5a344141f26560070efd6bc0c4156e6c469';
