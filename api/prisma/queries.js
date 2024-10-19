const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};
const getPost = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};
const getComments = async (postId) => {
  const comments = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      comments,
    },
  });
  return comments;
};
const getComment = async (postId, commentId) => {
  const comment = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      comments: {
        where: {
          id: commentId,
        },
      },
    },
  });
  return comment;
};
const createPost = async (title, content, userId) => {
  await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
};
const createComment = async (content, userId, postId) => {
  await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
};
module.exports = {
  getPosts,
  getPost,
  getComments,
  getComment,
  createPost,
  createComment,
};
