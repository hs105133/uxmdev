this.profilepic = "http://placekitten.com/250/200";
console.log(me);
if(!this.role){
 this.role = "User";   
}
if (me && me.role !== "Admin") {
  cancel("You cannot create admin user, only Admin can perform this operation", 405);
}
