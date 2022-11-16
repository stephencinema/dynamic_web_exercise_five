const express = require("express");
const router = express.Router();
// initialize firestore
const firestore = require("firebase/firestore");
// create a reference to the database
const db = firestore.getFirestore();

const createPostForm = `
<h1>Create Post<h1>
<form action="/create/submit">
  <div style="display: flex; flex-direction: column; max-width: 400px;">
    <label for="title">Title</label>
    <input type="text" name="postTitle" placeholder="Title" style="margin-bottom: 20px;" />
    <label for="text">Text</label>
    <input type="text" name="postText" placeholder="Text" style="margin-bottom: 20px;" />
    <label for="author">Author</label>
    <input type="text" name="author" placeholder="Author" style="margin-bottom: 20px;" />
    <button type="submit">Submit</button>
  <div>
</form>
`;

// middleware that is specific to this router
router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.send(createPostForm);
});

router.get("/submit", (req, res) => {
  const queryParams = req.query; // query params from URL
  const title = queryParams.postTitle;
  const text = queryParams.postText;
  const author = queryParams.author;
  // create ID from title
  const idFromTitle = title.replace(/\s+/g, "-").toLowerCase();
  // submit post to firebase
  const setBlogPost = firestore.setDoc(firestore.doc(db, "posts", idFromTitle), {
    title: title,
    text: text,
    author: author,
  });

  setBlogPost
    .then((response) => {
      // if successful send correct message
      res.send(`
      <h1>Submission Successful!</h1>
      <p><a href="/create">Add Another Post</a></p>
      <p><a href="/">Return Home</a></p>
    `);
    })
    .catch((error) => {
      // if failure send correct message
      console.warn(error);
      res.send(`Error Submitting: ${error.toString()}`);
    });
});

module.exports = router;
