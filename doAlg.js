/**
 * Provides list de-duping based on using hash keys
 * @module doAlg
 * @requires fs, path, bluebird
 * @author Nicholas Sardo <gcc.programmer@gmail.com>
 */
const Promise   = require( 'bluebird' );
const fs        = require( 'fs' );
const path      = require( 'path' );
module.exports  = {
  
  /**
   * Returns hash object with key counts
   * @function doAlg
   * @param {String} fileN - Full path to file
   * @return {Object} Hash
   */
  doAlg: ( fileN ) => {
        let hash = {}
          , readByLine = require( 'readline' ).createInterface({
              input: fs.createReadStream( fileN )
            });
        return new Promise(function( resolve ){   
          console.time( 'foo' );
          readByLine.on('line', function( line ){
            if( typeof hash[line] == "undefined" ){
              hash[line] = 1;
            } else {
              hash[line]++;
            }
          });

          readByLine.on( 'close', function(){ 
            resolve( hash ); //so that it can be passed along
          });
        });
  },
   
  /**
   * Returns hash object with key counts
   * @function doAlg
   * @param {Object} Hash - this object accumulates key groupings, counts
   * @param {String} fileN - Full path to file
   */   
  writeOutFile: ( hash, fileN ) => {
          return new Promise(function( resolve ){
            let wn      = 'wn' + path.basename( fileN )
              , wfile   = path.join('./processed', wn )
              , wstream = fs.createWriteStream( wfile ) //web viewable file
              , nm      = 'dl' + path.basename( fileN )
              , dlfile  = path.join( './downloads/', nm ) //downloadable file
              , dstream = fs.createWriteStream( dlfile );

            for( let line in hash ) {
              if ( hash[line] >= 1 ) {
                wstream.write( line + '<br />' );
                dstream.write( line + '\n' );
                continue; //next line
              }
            }
            wstream.end();
            dstream.end();
            resolve();
            console.timeEnd( 'foo' );
          });
  }
}