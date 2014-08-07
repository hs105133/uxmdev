if (me.role !== "Admin") {
  cancel("You cannot delete this image, only Admin can perform this operation", 405);
}