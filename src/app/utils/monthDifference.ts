const monthDifference = (from: string, to: string) => {
  const d1 = new Date(from)
  const d2 = new Date(to)

  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();

  return months <= 0 ? 0 : months;
}

// export default monthDifference

monthDifference('2024-01-01', '2024-04-30')