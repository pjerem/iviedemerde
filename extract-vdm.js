#!env node

/**
 * Ce script ne fait rien d'autre qu'appeller ShovelJS et enregistrer le retour
 * de cet appel dans un JSON
 * 
 * ATTENTION: Point important:
 * Je souhaite attirer votre attention sur le fait que la librairie ShovelJS a
 * été développée pour les besoins de ce test technique. Elle doit donc elle
 * aussi évaluée dans le cadre de ce test.
 * 
 * @author Jérémy Paul <contact@jeremypaul.fr>
 */
 
var program = require('commander');
var os = require('os');
var fs = require('fs');
var shovel = require('shoveljs');

program.version('1.0.0')
    .option('-n, --number [number]', 'Number of posts to extract.' )
    .option('-o, --outputFile [outputFile]', 'Where to save the data.')
    .parse(process.argv);

var numberOfPosts  = program.number || 200;
var outputFilename = program.outputFile || (os.tmpdir() + '/iviedemerde.db.json');

console.log('Extracting ' + numberOfPosts + ' VDM posts into ' + outputFilename);

/**
 * Configuring and launching Shovel
 * 
 * Since HTML structure at www.viedemerde.fr is calamitous, we are going to
 * extract the posts from mobile version at m.viedemerde.fr (which is not really
 * good to but ... heh.)
 */
var postId = 0;
shovel('http://m.viedemerde.fr/', {
    parent: '.content li', // Main elements we want to extract
    nextSelector: '.pagination.right a',
    number: numberOfPosts,
    structure: {
        // I should have extracted the real VDM ID, maybe later. Maybe not.
        'id': {extractor: function() { return postId++; }},
        'content': '.text',
        'date': { 
            selector: '.date', 
            extractor: function($elm) {
                return $elm.text().substr(0,10)
                        .split('/')
                        .reverse() //Dates are an infinite source of fun.
                        .join('-');
            }
        },
        'author': {
            selector: '.date',
            extractor: function($elm) {
                // Author is inside .date, only separated
                // by a <br> tag. Not any logic here.
                return $elm.text().replace(/[0-9]*\/[0-9]*\/[0-9]*/g,'');
            }
        }
    }
}).then(function(vdmposts) {
    console.log('Extracted ' + vdmposts.length + ' posts.');
    var json = JSON.stringify(vdmposts, null, 4);
    fs.writeFile(outputFilename, json, function(err) {
        if(!err) {
            console.log('All saved in ' + outputFilename + ' . Have fun !')
        } else {
            console.error('An error occured : '+ err);
        }
    });
}, function(error) {
    console.error(error);
});
