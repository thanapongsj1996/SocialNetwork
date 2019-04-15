const Post = require('../models/post')

exports.getPosts = (req, res) => {
    Post.find((err, posts) => {
        if (err) { return res.status(403).json({ error: err }) }
        res.json({ posts })
    }).select('_id title body')
}

exports.createPost = (req, res) => {
    const post = new Post(req.body)
    post.save((err, result) => {
        if (err) { return res.json({ error: err }) }
        res.json({ post: result })
    })
}