var mangoose = require('mongoose');

//get schema out of mangoose
var schema = mangoose.Schema;

//making new schema

var vehicaleSchema = new schema({
make: String,
model: String,
color: String

});

module.exports = mangoose.model('Vehicale',vehicaleSchema);
