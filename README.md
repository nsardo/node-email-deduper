# email-diff-ex algorithm
![Screen Cast](https://github.com/nsardo/node-email-deduper/blob/master/dedup.gif)

## NOTA BENE
This is example code.

You need to create three directories if they are not present: uploads/ downloads/ and processed/
This can be done on the commandline as follows ($ denotes command prompt):

```
$ mkdir uploads downloads processed
```

## The structure of the project
**Documentation** on the code is in the [jsdoc](http://usejsdoc.org/) folder. If you've never used *jsdoc* before, all you need do is drag the *index.html* file from that folder into your browser. From that document you can browse both the api, and the code.

**Tests** not many of them, just some smoke checks on the algorithm, but *NOTA BENE*: running the tests will *wipe the contents* of both the /processed and /download directories.

From the command line (symbolized as $ here):

```
$ npm test
```
Will run the scant mocha tests

```
$ npm run cover
```
Will run Istanbul

**To RUN** from the command line in the main (root) project directory (represented again, as $):

```
$ node app.js
``
