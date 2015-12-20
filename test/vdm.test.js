var rewire = require('rewire');
var expect = require('chai').expect;
var Chance = require('chance');
var chance = new Chance("test"); //Seed is "test", don't loose it.
var vdm    = rewire('../lib/vdm');

//Mocking some posts before testing
var mockedPosts = (function(){
    var posts = [];
    for(var i = 0; i < 10; i++) {
        posts.push({
            id: i,
            content: chance.sentence(),
            author: chance.name(),
            date: (i < 10 ? i : '0'+i) + '-12-2015'
        });
    }
    return posts;
})();
vdm.__set__('posts', mockedPosts);

//fakeresponse snippet, for simple and non asynchronous use.
var fakeResponse = function() {
    return {
        send: function(data) {
            this.sent = data;
        }
    }
};

// Running the tests
describe('iviedemerde', function() {
    describe('vdm module', function() {
        it('should retrieve the right post', function() {
            var res = fakeResponse();
            vdm.post({params: {id: 8}}, res);
            expect(res.sent.post.id).to.equal(8);
        });
        
        it('should retrieve all the posts', function() {
            var res = fakeResponse();
            vdm.postsList({query: {}}, res);
            expect(res.sent.posts.length).to.equal(mockedPosts.length);
        });
        
        it('should filter posts', function() {
            var res = fakeResponse();
            vdm.postsList({query: {author: mockedPosts[3].author}}, res);
            expect(res.sent.posts[0].author).to.eql(mockedPosts[3].author);
            
            var startDate = mockedPosts[3].date;
            var stopDate  = mockedPosts[6].date;
            vdm.postsList({query: {
                from: startDate,
                to: stopDate
            }}, res);
            expect(res.sent.posts.length).to.equal(4);
        })
    });
});

describe('Jérémy Paul', function() {
    xit('should work at iAdvize', function() {
        var me = {
            name: 'Jérémy',
            surname: 'Paul',
            works_at: 'Not iAdvize' //TODO: Fix this.
        }
        
        expect(me.works_at).to.equal('iAdvize');
    });
});