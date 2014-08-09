if (me && me.role !== "Admin") {
  cancel("You cannot remove all comments, only Admin can perform this operation", 405);
}