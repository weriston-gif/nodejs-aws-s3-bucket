(async () => {
    const database = require('./db');
    const enterprise = require('./enterprise');
    await database.sync()
})();