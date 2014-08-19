var compression = require('compression');

app.use(function(req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=604800"); // 7 days
    res.setHeader("Expires", new Date(Date.now() + 604800000).toUTCString());  
    next();
});

app.get('/bar', function(req, res){
  res.json({name: "Hello"});
});

app.use(compression());
app.use(express.static(__dirname+'/public'));