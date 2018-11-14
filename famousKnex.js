const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: 'test_db',
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

const firstName = process.argv[2];

function output(rows) {
  console.log()
  for (let i = 0; i < rows.length; i++) {
    let first = rows[i].first_name;
    let last = rows[i].last_name;
    let bod = rows[i].birthdate;
    let year = bod.getFullYear();
    let month = bod.getMonth();
    let day = bod.getDate();
    let out = (i + 1) + ' ' + first + ' ' + last + ', born ' + year + '-' + month + '-' + day
    console.log(out);
  }
}

knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
  .where('first_name', '=', firstName)
  .asCallback(function (err, rows) {
    if (err) return console.error(err);
    output(rows);
  });