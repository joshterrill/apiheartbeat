const Router = require('express').Router;
const AuthService = require('./auth.service');

module.exports = () => {
  const api = Router();

  api.post('/register', async (req, res) => {
    try {
      const { email, password, permissions } = req.body;
      const register = await AuthService.register(email, password, permissions);
      res.json(register);
    } catch (error) {
      res.json(error);
    }
  });

  api.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const login = await AuthService.login(email, password);
      res.json(login);
    } catch (error) {
      res.json(error);
    }
  });

  return api;
}
