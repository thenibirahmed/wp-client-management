export const formatRevenue = (value) => {
  console.log(value);
  value = Number(value);

  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + "B";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + "M";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + "K";
  } else {
    return value.toFixed(2);
  }
};
