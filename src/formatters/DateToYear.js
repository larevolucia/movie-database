export default function DateToYear({ fullDate }) {
  const date = new Date(fullDate);
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  return year;
}
