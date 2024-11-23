function truncateText(text, len = 30) {
  const textLegth = text?.length;

  if (textLegth < len) return text;

  return text?.substring(0, len) + "...";
}

export default truncateText;

export const ucwords = (str) => {
  return str
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
};
