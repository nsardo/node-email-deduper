/**
 * @author Nicholas Sardo <gcc.programmer@gmail.com>
 *
 * NOTEA BENE:  THIS TEST FILE WILL WIPE THE /PROCESSED AND /DOWNLOAD FILES
 */
const path    = require('path');
const fs      = require('fs');
const Alg     = require('../doAlg.js');
const chai    = require('chai');
const should  = chai.should();
chai.use(require('chai-fs'));
const assert  = require('assert');
let file;

describe('Algorithm Tests', () => {

  it('before writeOutFile is called, directories empty', (done) => {
    let dd = path.resolve( '.', './downloads/' )
      , pd = path.resolve( '.', './processed/' );
    pd.should.be.a.directory('pd').and.not.have.contents(['wnfixture.txt'], 'wnfixture');
    dd.should.be.a.directory('dd').and.not.have.contents(['dlfixture.txt'], 'dlfixture');
    done();
  });

  it('doAlg creates a hash of values from list', (done) => {
    let p = __dirname + '/fixture/';
    file = path.join( p, 'fixture.txt');
    Alg.doAlg(file).then((hash) => {
      hash.should.not.be.empty;
      hash.should.be.a('object');
      done();
    })
  });

  before(() => {
    let p = __dirname + '/fixture/';

    file = path.join( p, 'fixture.txt');
      Alg.doAlg(file).then((hash) => {
        Alg.writeOutFile(hash, file);
      });
  });

  it('writeOutFile creates a new file', (done) => {
    let pf = path.resolve( './processed/', 'wnfixture.txt')
      , df = path.resolve( './downloads/', 'dlfixture.txt')
      , pd = path.resolve( '.', './processed')
      , dd = path.resolve( '.', './downloads');

    pf.should.be.a.path();
    pf.should.be.a.file('pf').and.not.empty;
    fs.existsSync(pf).should.equal(true);
    assert.deepEqual( fs.existsSync(pf), true); //just double checking
    pd.should.be.a.directory();
    df.should.be.a.path();
    df.should.be.a.file('dl').and.not.empty;   
    dd.should.be.a.directory();  
    fs.existsSync(pd).should.equal(true);   
    assert.deepEqual( fs.existsSync(dd), true); //ditto

    done();
  });

  after(() => {
    fs.unlinkSync('./processed/wnfixture.txt');
    fs.unlinkSync('./downloads/dlfixture.txt');
  });
});