const mongoose = require("mongoose");
const URI =
  process.env.status === "PROD"
    ? process.env.DBURI_PROD
    : process.env.DBURI_DEV;
const db = mongoose.connection;

function connect() {
  mongoose.connect(URI, {
    // useFindAndModify: true,
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on("open", (_) => {
    console.log("Conectado a la base de datos");
  });

  db.on("error", (error) => console.log("Error: ", error));
}

connect();