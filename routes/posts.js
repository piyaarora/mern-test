const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const auth = require('../middleware/auth')

const {check,validationResult} = require('express-validator');

const Post = require('../models/Post');


// Add post
router.post('/',[
    check('title','Please add title').not().isEmpty(),
    check('postBody','Please add body').not().isEmpty(),
],
async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
   
    const {title,postBody} = req.body;
    try {
        // add new Post
        post = new Post({
            title,
            postBody
        })
      
        // saving user
        await post.save();
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})

// get post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

// update post
router.put('/:id', async (req, res) => {
    const { title, postBody } = req.body;

    // Build post object
    const postFields = {};
    if (title) postFields.title = title;
    if (postBody) postFields.postBody = postBody;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'post not found' });


        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: postFields },
            { new: true },
        );

        res.json(post);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        
        await Post.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

