var MigrationRunner = require('node-pg-migrate/lib/runner');

var dir = process.argv[2] || 'up';
var count = process.argv[3] || Infinity;

if(dir == 'down' && count == Infinity) count = 1; //default to 1 migration for down direction
console.log("\nMigrating " + dir + " for " + count + " migrations...\n");

var options = {
  database_url: 'postgres://user:password@localhost/dbname',
  dir: 'migrations',
  migrations_table: 'migrations',
  direction: dir,
  count: count
};

var runner = new MigrationRunner(options);

runner.run(function (err, other) {
    if (err) {
        console.log(err.stack);
        process.exit(1);
    }
    console.log('Migrations complete!');
    process.exit(0);
});
