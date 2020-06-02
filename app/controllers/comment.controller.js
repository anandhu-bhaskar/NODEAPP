// Defines the behaviour for routes declared in routes.js file

const Comment = require('../models/comment.model.js');

// Create and Save a new Comment
exports.create = (req, res) => {

    // Validate request
    if(!req.body.message) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // Create a Note
    const comment = new Comment({
        name: req.body.name || "Anonymous", 
        email: req.body.email,
        message: req.body.message,
        flag : req.body.flag
    });

    // Save Note in the database
    comment.save()
    // .then(data => {
    //     // res.send(data);
    //     // await task.save(); 
    //     res.redirect('/');
    // })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    

};

// Retrieve and return all comments from the database.
exports.findAlll = (req, res) => {
    Comment.find()
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params.commentId
        });
    });
};


// Update a comment identified by the commentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.message) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // Find comment and update it with the request body
    Comment.findByIdAndUpdate(req.params.commentId, {
        name: req.body.name || "Anonymous",
        message: req.body.message,
        email: req.body.email
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error updating comment with id " + req.params.commentId
        });
    });
};

// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send({message: "Comment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete comment with id " + req.params.commentId
        });
    });
};


// Retrieve and return all comments from the database. with flag
exports.findAll = (req, res) => {
    Comment.find({flag:req.params.flag})
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};
