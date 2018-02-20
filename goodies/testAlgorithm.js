/**
 * @author Nicholas Sardo
 * First run "createRandomEmailList.js", THEN this one.  
 * It runs the algorithm with production within the confines of this folder.
 */
 
const Alg = require('../doAlg.js');


Alg.doAlg('./email-list.txt').then((hash) => {
  Alg.writeOutFile(hash, './email-list.txt');
});