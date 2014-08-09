this.profilepic = "http://lorempixel.com/250/200/sports";
if(!this.role){
 this.role = "User";   
}
if (me && me.role !== "Admin") {
  cancel("You cannot create admin user, only Admin can perform this operation", 405);
}
