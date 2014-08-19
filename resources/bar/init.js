var compression = require('compression');

app.get('/bar', function(req, res){
  res.json({name: "Hello"});
});

app.use(compression());
app.use(express.static(__dirname+'/public'));