export default function isToday(createdAt: string) {
  const date = new Date(createdAt);
  const today = new Date();
  return date.toLocaleDateString() === today.toLocaleDateString();
}
