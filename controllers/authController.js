const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.render('register', { error: 'All fields are required' });
  }

  const users = JSON.parse(fs.readFileSync(usersPath));
  if (users.find(u => u.email === email)) {
    return res.render('register', { error: 'Email already exists' });
  }

  users.push({ name, email, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.send('Account created. <a href="/auth/login">Login here</a>');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.render('login', { error: 'Invalid credentials' });
  }

  req.session.user = user;
  res.redirect('/video/dashboard/all');
};
