const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.govpdkb.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const ihminenSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Ihminen = mongoose.model("Ihminen", ihminenSchema);

if (process.argv.length === 3) {
  Ihminen.find({}).then((result) => {
    result.forEach((item) => {
      console.log(item);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];

  const number = process.argv[4];

  const ihminen = new Ihminen({
    name: name,
    number: number,
  });

  ihminen.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
