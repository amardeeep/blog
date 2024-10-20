const express = require("express");
const dotenv = require("dotenv");
const queries = require("./prisma/queries");
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Serving You!");
});
//getting posts and comments
app.get("/posts", async (req, res) => {
  const posts = await queries.getPosts();
  res.send(posts);
});
app.get("/posts/:postid", async (req, res) => {
  const postId = req.params.postid;
  const post = await queries.getPost(postId);
  res.send(post);
});
app.get("/posts/:postid/comments", async (req, res) => {
  const postId = req.params.postid;
  const comments = await queries.getComments(postId);
  res.send(comments);
});
app.get("/posts/:postid/comments/:commentid", async (req, res) => {
  const postid = req.params.postid;
  const commentid = req.params.commentid;
  const comment = await queries.getComment(postid, commentid);
  res.send(comment);
});
//creating posts and comments
app.post("/post", async (req, res) => {
  const { title, content, userId } = req.body;
  await queries.createPost(title, content, userId);
  console.log("Created New Post");
  res.send("Created New Post");
});
app.post("/comment", async (req, res) => {
  const { content, userId, postId } = req.body;
  await queries.createComment(content, userId, postId);
  console.log("Created New Comment");
  res.send("Created New Comment");
});
//delete comment and posts
app.delete("/posts/:postid", async (req, res) => {
  const postId = req.params.postid;
  await queries.deletePost(postId);
  console.log("Post deleted");
  res.send("Post deleted");
});
app.delete("/comments/:commentid", async (req, res) => {
  const commentid = req.params.commentid;
  await queries.deleteComment(commentid);
  console.log("Comment deleted");
  res.send("Comment deleted");
});
app.listen(process.env.PORT, () => {
  "Listening On Port 3000";
});
