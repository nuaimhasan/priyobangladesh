const makeSlug = (name) => {
  return name
    .toString() // Ensure the input is a string
    .trim() // Remove spaces from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove multiple hyphens
    .replace(/\//g, "") // Remove forward slashes
    .toLowerCase(); // Convert to lowercase (optional for Bengali)
};

module.exports = makeSlug;
