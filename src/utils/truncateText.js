function truncateText(text, len = 30) {
  const textLegth = text?.length;

  if (textLegth < len) return text;

  return text?.substring(0, len) + "...";
}

export default truncateText;
