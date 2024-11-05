import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "7777",
  database: "postgres",
});

await client.connect();

export { client };