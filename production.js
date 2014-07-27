var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'development',
  // env: 'production',
  db: {
    host: 'localhost', // for prod xxxxxx.mongolab.com
    port: 27017, 
    name: 'test'
    // credentials: {
    //   username: 'hs105133',
    //   password: '12345'
    // }
  }
});

server.listen();

server.on('listening', function() {
  console.log("Server is listening on " + process.env.PORT || 5000);
});

server.on('error', function(err) {
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});

var mongo = require('mongodb');

var mongoUri = "mongodb://hs105133:12345@ds033217.mongolab.com:33217/techm" || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

mongo.Db.connect(mongoUri, function (err, db) {
//   db.collection('mydocs', function(er, collection) {
//     collection.insert({'mykey': 'myvalue is Hemant'}, {safe: true}, function(er,rs) {
//       console.log("Done with INsert");
//     });
//   });
});


