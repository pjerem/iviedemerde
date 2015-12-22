var os = require('os');
var _ = require('lodash');

try {
    var posts = require(os.tmpdir() + '/iviedemerde.db.json');
}
catch (e) {
    if(!(typeof global.it === 'function')){ // Avoids display of this message
                                            // while in tests.
        console.log('No posts found. Did you forgot to run ./extract-vdm.js ?')
    }
    var posts = [];
}

console.log('Loaded ' + posts.length + ' posts into memory.')

module.exports = {
    /**
     * Returns one post using its ID.
     * Usage: /posts/:id
     * 
     * @param {number} req.params.id
     */
    post: function(req, res) {
        var postId = parseInt(req.params.id, 10);
        var post = _.findWhere(posts, {
            id: postId
        });
        res.send(post ? {
            post: post
        } : {
            error: 'No post for id : ' + req.params.id
        });
    },
    
    /**
     * Returns a collection of posts, optionally filtered
     * Usage: /posts/[?parameters]
     * 
     * @param {Date}    req.query.from   From date
     * @param {Date}    req.query.to     To date   
     * @param {String}  req.query.author Author's name
     */
    postsList: function(req, res) {
        var fromDate = req.query.from;
        var toDate = req.query.to;
        var author = req.query.author;

        var filteredPosts = _.filter(posts, function(post) {
            return (!fromDate || (post.date >= fromDate)) &&
                (!toDate || (post.date <= toDate)) &&
                (!author || (author == post.author));
        });

        res.send({
            posts: filteredPosts,
            count: filteredPosts.length
        });
    }
};
