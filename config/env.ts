const DB_APP_CONNECTION_LOCALE = process.env.DB_APP_CONNECTION || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const DB_APP_CONNECTION = DB_APP_CONNECTION_LOCALE.replace(
  "<password>",
  DB_PASSWORD
);

export { DB_APP_CONNECTION };
