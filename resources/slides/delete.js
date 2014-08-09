if (me && me.role !== "Admin") {
  cancel("You cannot delete all slides, only Admin can perform this operation", 405);
}