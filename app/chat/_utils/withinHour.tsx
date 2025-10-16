export default function withinHour(t1: string, t2: string): boolean {
  const date1 = new Date(t1);
  const date2 = new Date(t2);
  const hourDiff = date1.getTime() - date2.getTime();
  return Math.abs(hourDiff) <= 1 * 60 * 60 * 1000;
}
