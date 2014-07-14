dpd.myslides.post(this, function(todo, err) {
  if(err) return console.log(err);
  console.log(todo); // {title: 'foo the bar', order: 7, done: false, _id: "4b5783300334000000000aa9"}
});