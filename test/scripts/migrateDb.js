// scripts/db/migrate.js
import path from 'path';
import { spawn } from 'child-process-promise';
const spawnOptions = { stdio: 'inherit' };

(async () => {
try {
    // Drop DB
    await spawn(path.join(__dirname, `../../node_modules/.bin/sequelize`), ['db:drop', `--env=test`], spawnOptions);
    // Create DB
    await spawn(path.join(__dirname, `../../node_modules/.bin/sequelize`), ['db:create', `--env=test`], spawnOptions);
    // Migrate the DB
    await spawn(path.join(__dirname, `../../node_modules/.bin/sequelize`), ['db:migrate', `--env=test`], spawnOptions);
    console.log('*************************');
    console.log('Migration successful');
  } catch (err) {
    // Oh no!
    console.log('*************************');
    console.log('Migration failed. Error:', err.message);
    process.exit(1);
  }
process.exit(0);
})();
