// 'lib/auth/auth0/server.js'
import { handleAuth, handleLogin, handleLogout, handleCallback, getSession } from '@auth0/nextjs-auth0';

const auth0Config = {
  secret: '_EjKvpXupLfuaS4f22rJM16ksAi4lrh0m7h7IfM-SS7xLUSv2f5CANIj61pxrH6G',
  baseURL: 'http://localhost:3000', // Replace with your app's base URL
  clientID: 'iX2Fz8Yib9kQaX4wIAcQb8aIaYahRPTd',
  issuerBaseURL: 'https://dev-5hdfg43tzzl6p3rk.us.auth0.com',
  clientSecret: '_EjKvpXupLfuaS4f22rJM16ksAi4lrh0m7h7IfM-SS7xLUSv2f5CANIj61pxrH6G',
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
