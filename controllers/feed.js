const { validationResult } = require('express-validator');
const post = require('../models/post');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      if(post.length < 0) {
        const error = new Error('Cloud not found posts');
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({
          message: "OK",
          posts: posts
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = "images/3sMKgz.jpg"
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: {
      name: 'Muhammad'
    }
  });
  post
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error('Cloud not found post.')
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'ok',
        post: post
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
}