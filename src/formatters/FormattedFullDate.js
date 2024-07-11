export default function FormattedFullDate({ fullDate }) {
  const date = new Date(fullDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
