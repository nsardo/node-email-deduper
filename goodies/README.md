
## What's here?

This folder contains a simplistic "random email generator", and a driver for the algorithm that keeps its
productucts within the confines of this directory. Bear in mind that this generator is hastily done, back of the envelope type of software, so it's far from being even especially accurate.

## How do I use it?

Open a terminal inside this direcotry, then enter the following (in all descriptions hence, $ is terminal prompt).

```
$ node createRandomEmailList.js
```
This will create a random email list of 100,000 generated emails with a duplicate count of roughly 50%
You can look at how the parameters can be used within the source file.

Next, in the terminal:

```
$ node testAlgorithm.js
```
This will run the algorithm against this randomly gnerated file, removing all dupes, and depositing the product
in the directories: process/ and downloads/
