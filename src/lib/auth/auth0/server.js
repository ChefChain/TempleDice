// @/lib/auth/auth0/server.js
import { handleAuth, handleLogin, handleLogout, handleCallback, getSession } from '@auth0/nextjs-auth0';

const auth0Config = {
  secret: 'iWVcQiCUqBxoMF4S8h4oVvmbdT64X5GTCl_ixVm6YVFfy_hykJyHQIesx8vcCBoW',
  baseURL: 'http://localhost:3000', // Replace with your app's base URL
  clientID: 'aOmcXx5lzxNObSVUESCA5c661fRViwSk',
  issuerBaseURL: 'https://dev-5hdfg43tzzl6p3rk.us.auth0.com',
  clientSecret: 'iWVcQiCUqBxoMF4S8h4oVvmbdT64X5GTCl_ixVm6YVFfy_hykJyHQIesx8vcCBoW',
  routes: {
    callback: '/auth/auth0/callback',
    postLogoutRedirect: '/',
  },
};

export const auth0 = {
  handleLogin: (req, res, options) => handleLogin(req, res, { ...auth0Config, ...options }),
  handleLogout: (req, res, options) => handleLogout(req, res, { ...auth0Config, ...options }),
  handleCallback: (req, res, options) => handleCallback(req, res, { ...auth0Config, ...options }),
  getSession: (req, res, options) => getSession(req, res, { ...auth0Config, ...options }),
};
