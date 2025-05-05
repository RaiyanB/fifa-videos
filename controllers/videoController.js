const fs = require('fs');
const path = require('path');
const videosPath = path.join(__dirname, '../data/videos.json');

exports.getNewVideo = (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  res.render('new_video');
};

exports.postNewVideo = (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  const { title, url } = req.body;
  if (!title || !url) {
    return res.render('new_video', { error: 'All fields required' });
  }

  const videos = JSON.parse(fs.readFileSync(videosPath));
  videos.push({ title, url, uploader: req.session.user.email });
  fs.writeFileSync(videosPath, JSON.stringify(videos, null, 2));
  res.redirect('/video/dashboard/all');
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const filter = req.params.filter;
  const videos = JSON.parse(fs.readFileSync(videosPath));
  const filtered = filter === 'mine'
    ? videos.filter(v => v.uploader === req.session.user.email)
    : videos;

  res.render('dashboard', { videos: filtered });
};
