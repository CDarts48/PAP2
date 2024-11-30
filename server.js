const concurrently = require('concurrently');

concurrently([
  { command: 'npm run start', name: 'client', prefixColor: 'blue' },
  { command: 'node server/server.js', name: 'server', prefixColor: 'green' }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3
}).result
  .then(() => {
    console.log('Both processes have exited successfully.');
    process.exit();
  })
  .catch(error => {
    console.error('One of the processes failed:', error);
    process.exit(1);
  });