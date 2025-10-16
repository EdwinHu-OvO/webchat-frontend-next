export default function isToday(createdAt: string) {
  const date = new Date(createdAt);
  const today = new Date();
  console.log(date.toLocaleDateString(), today.toLocaleDateString());
  return date.toLocaleDateString() === today.toLocaleDateString();
}
