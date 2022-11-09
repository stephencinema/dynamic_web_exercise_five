const express = require("express");
const firebase = require("firebase/app");
// initiate express
const app = express();
// setting port - dynamically with heroku
const port = process.env.PORT || 4000;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA4TygMEysbLTgOvjKd-m3eqQhG5HO3i0",
  authDomain: "dynamic-web-exercise-five-2022.firebaseapp.com",
  projectId: "dynamic-web-exercise-five-2022",
  storageBucket: "dynamic-web-exercise-five-2022.appspot.com",
  messagingSenderId: "247044724219",
  appId: "1:247044724219:web:62e72e671b7f256e48275e",
};
firebase.initializeApp(firebaseConfig);

// routes for directing user to correct place
const indexRoute = require("./routes/index");
const singlePostRoute = require("./routes/singlePost");
const createPostRoute = require("./routes/createPost");

// tell express to use routes...
app.use("/", indexRoute);
app.use("/post", singlePostRoute);
app.use("/create", createPostRoute);

// listen for requests on the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
