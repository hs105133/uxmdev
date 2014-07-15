if (me) {
    this.userId = me.id;
}

this.createdOn = new Date().getTime();

dpd.covers.post({}, function(result, error) {

//    if (me) {
//      dpd.users.put(me.id, {
//        covers: this.id
//      }, function(data) {
//        console.log(data);
//      });
//    }
});