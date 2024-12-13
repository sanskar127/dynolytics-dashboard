import { NowRequest, NowResponse } from '@vercel/node';
import jsonServer from 'json-server';
// Create JSON Server instance
const server = jsonServer.create();
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults();

// CORS Headers
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your domain)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

server.use(middlewares);
server.use(router);

// Export the serverless function for Vercel
module.exports = (req: NowRequest, res: NowResponse) => {
  server(req, res);
};
