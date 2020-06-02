// #creates a module and exports it to Controller.js

module.exports = (app) => {
    const comments = require('../controllers/comment.controller.js');

    // Create a new Comment
    app.post('/comments', comments.create);

    // Retrieve all Notes
    app.get('/comments', comments.findAlll);

    // Retrieve a single Comment with noteId
    app.get('/comments/:commentId', comments.findOne);

    // Update a Comment with noteId
    app.put('/comments/:commentId', comments.update);

    // Delete a Comment with noteId
    app.delete('/comments/:commentId', comments.delete);

    // Retrieve all Notes
    app.get('/comments/posts/:flag', comments.findAll);
}