function truncateText(text) {
  const textLegth = text?.length;

  if (textLegth < 65) return text;

  return text.substring(0, 65) + "...";
}

export default truncateText;
