// write a function that receives a string with a pattern for missing words
// and a variable length argument which represents the tokens that will be replaced
// in the original string

const formatString = (string, ...tokens) => {

};


console.log(formatString('this is a {0} string and we\'ve {1} it', 'nice', 'modified'));
// should print 'this is a nice string and we've modified it'