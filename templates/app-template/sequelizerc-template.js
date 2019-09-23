module.exports = `const path = require('path');

module.exports = {
  'controllers-path': path.resolve('src', 'app', 'controllers'),
  'models-path': path.resolve('src', 'app', 'models'),
  'services-path': path.resolve('src', 'lib', 'services'),
  'config': path.resolve('src', 'config', 'config.js'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations')
}`;