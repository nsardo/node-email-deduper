/**
 * Server for list de-duping 
 * @module app
 * @requires express, busboy, bodyParser, fs, path, bluebird, doAlg
 * @author Nicholas Sardo <gcc.programmer@gmail.com>
 */
const express     = require( 'express' );
const Busboy      = require( 'busboy' );
const bodyParser  = require( 'body-parser' );
const Promise     = require( 'bluebird' );
const fs          = require( 'fs' );
const path        = require( 'path' );
const Alg         = require( './doAlg.js' );
const app         = express();

let jsonParser = bodyParser.json()
  , fileName;

app.use( express.static( 'public' ) );

/**
 * Home Base
 * @method GET
 */
app.get( '/', function( req, res ){
  res.sendFile( __dirname + '/public/html/index.html' );
});

/**
 * User uploads a file
 * @method POST
 */
app.post( '/', function( req, res ){
    const busboy = new Busboy({ 
      headers: req.headers, 
      highWaterMark: 2 * 1024 * 1024,
      limits: {
        fileSize: 10 * 1024 * 1024
      } 
    });
    busboy.on( 'file', function( fieldname, file, filename, encoding, mimetype ){
      var saveTo  = path.join( './uploads/', filename );
      fileName    = saveTo;
      file.pipe( fs.createWriteStream( saveTo ) );
    });
    busboy.on( 'finish', function(){
      //res.writeHead( 200, { 'Connection': 'close' } );
      res.end();
    });
    return req.pipe( busboy );
});

/**
 * User Runs the Algorithm NOTE: Quasi-questionable usage of the PUT verb
 * @method PUT
 */
app.put( '/', jsonParser, function( req, res ){
    if ( req.body.func == 'browser' ){
      Alg.doAlg( fileName ).then(( hash ) => {
        Alg.writeOutFile( hash, fileName )
      }).then(() => {
        let wn      = 'wn' + path.basename( fileName )
          , wfile   = path.join('./processed', wn )
          , readStream = fs.createReadStream( wfile );
        res.set( 'Content-Type', 'text/plain' );
        readStream.on( "error", function( err ){
          console.log( "Got error while processing stream " + err.message );
          res.end();
        });
        readStream.pipe( res );
      });
    }
});
 
/**
 * User request a download of de-duped file
 * @method GET (Download Processed File)
 */   
app.get( '/download', function( req, res ){
      let nm      = 'dl' + path.basename( fileName )
        , dlpath  = path.join( './downloads/', nm );

      res.setHeader( 'Content-disposition', 'attachment; filename=' + dlpath );
      res.setHeader( 'Content-type', 'text/plain' );

      var filestream = fs.createReadStream( dlpath );
      filestream.pipe( res );

});

/**
 * Fire up the server
 * @method server
 * @main
 */
let server = app.listen( process.env.PORT || 3000, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log( 'ChefSteps-alg listening on http://%s:%s', host, port );
});
