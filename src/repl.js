// repl.js
const repl = require('repl');
const db = require('./models/index'); // Adjust the path as necessary
const user = require('./models/user');

const replServer = repl.start({
  prompt: 'sequelize> '
});

// Attach your db object to the REPL context
replServer.context.db = db;
