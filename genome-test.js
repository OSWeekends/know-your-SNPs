var gql = require('gql');
var dna = require('./demo-data/23andme-male.json');

var query = gql.or([
  gql.exact('rs334', 'TT'),
  gql.exact('i3003137', 'AA')
]);

var isMatch = query(dna);
console.log(isMatch); // true or false