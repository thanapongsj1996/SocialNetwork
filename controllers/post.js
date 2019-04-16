const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')

exports.getPosts = (req, res) => {
    Post.find((err, posts) => {
        if (err) { return res.status(403).json({ error: err }) }
        res.json({ posts })
    }).select('_id title body')
}

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            })
        }
        let post = new Post(fields)

        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        post.postedBy = req.profile
        
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            psot.photo.contenType = files.photo.type
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })
    })
}