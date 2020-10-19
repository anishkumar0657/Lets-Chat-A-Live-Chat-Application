const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1092497',
  key: '0f8597ceccb0b4a3adb7',
  secret: '280a92eb00965cef0667',
  cluster: 'ap2',
  encrypted: true
});

module.exports = pusher;