const pg = require("pg");
const settings = require("./settings"); // settings.json
const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: 'test_db',
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const firstName = process.argv[2];
const q = `SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = '${firstName}';`;

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(q, (err, result) => {

    if (err) {
      return console.error("error running query", err);
    }
    console.log('Found ' + result.rows.length + ' person(s) by the name ' + "'" + firstName + "'");
    for (let i = 0; i < result.rows.length; i++) {
      let first = result.rows[i].first_name;
      let last = result.rows[i].last_name;
      let bod = result.rows[i].birthdate;
      console.log((i + 1) + ' ' + first + ' ' + last + ', born ' + bod);

    }
    // console.log('result', result.rows);
    client.end();
  });
});