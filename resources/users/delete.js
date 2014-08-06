if (me.role !== "Admin") {
  cancel("You cannot delete this user, only Admin can perform this operation", 405);
}