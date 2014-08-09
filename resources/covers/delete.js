if (me && me.role !== "Admin") {
  cancel("You cannot delete all covers, only Admin can perform this operation", 405);
}