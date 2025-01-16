/*
const express = require('express');
const Post = require('../models/Post'); // Importing the Post model

const router = express.Router();
const validatePostData = require('../middleware/validatePostData');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

// Google OAuth callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Redirect to the blog
    res.redirect('file:///C:/Users/shamr/Documents/Vishwa_Documents/Web%20Dev/Personal%20Blog/index.html');
});

// New LOGIN route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Example static user validation (replace with actual authentication logic)
    if (username === 'admin' && password === 'password123') {
        // Redirect to Personal Blog's Home page after successful login
        res.redirect('file:///C:/Users/shamr/Documents/Vishwa_Documents/Web%20Dev/Personal%20Blog/index.html');
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Existing routes

// GET all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll(); // Fetch all posts from the database
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', error: err });
    }
});

// GET a single post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id); // Fetch a post by ID
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err });
    }
});

// POST create a new post
router.post('/posts', validatePostData, async (req, res) => {
    try {
        const { title, content } = req.body;

        // Create the new post in the database
        const post = await Post.create({ title, content });

        res.status(201).json({
            message: 'Post created successfully!',
            post,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating post', error: err });
    }
});

// PUT update a post by ID
router.put('/posts/:id', validatePostData, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findByPk(req.params.id); // Find post by ID

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the post's title and content
        post.title = title;
        post.content = content;
        await post.save();

        res.status(200).json({
            message: 'Post updated successfully!',
            post,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating post', error: err });
    }
});

// DELETE a post by ID
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.destroy(); // Delete the post from the database
        res.status(200).json({
            message: 'Post deleted successfully!',
        });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post', error: err });
    }
});

// Middleware for validating input
const validatePost = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 20 })
        .withMessage('Content must be at least 20 characters long'),
];

// Middleware for checking validation result
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Updated POST route with validation
router.post('/posts', validatePost, checkValidation, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content });
        res.status(201).json({
            message: 'Post created successfully!',
            post,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating post', error: err });
    }
});

module.exports = router;
*/

const express = require("express");
const Post = require("../models/Post");
const { validatePostData, checkValidation } = require("../middleware/validatePostData");

const router = express.Router();

// GET all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts", error: err });
    }
});

// GET a single post by ID
router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: "Error fetching post", error: err });
    }
});

// POST create a new post
router.post("/posts", validatePostData, checkValidation, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content });
        res.status(201).json({ message: "Post created successfully!", post });
    } catch (err) {
        res.status(500).json({ message: "Error creating post", error: err });
    }
});

// PUT update a post by ID
router.put("/posts/:id", validatePostData, checkValidation, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.status(200).json({ message: "Post updated successfully!", post });
    } catch (err) {
        res.status(500).json({ message: "Error updating post", error: err });
    }
});

// DELETE a post by ID
router.delete("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await post.destroy();
        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting post", error: err });
    }
});

module.exports = router;

