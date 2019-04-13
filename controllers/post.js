const Post = require('../models/post')

exports.getPosts = (req, res) => {
    Post.find({}, { _id: 1, title: 1, body: 1 })
        .then((posts) => {
            res.json({ posts })
        })
        .catch(err => console.log(err))
}

exports.createPost = (req, res) => {
    const post = new Post(req.body)
    post.save().then(result => {
        res.json({
            post: result
        })
    })
}