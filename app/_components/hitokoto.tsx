async function getHitokoto(type: string[], max_length: number, min_length: number) {
  const response = await fetch(
    `https://v1.hitokoto.cn/?encode=json&c=${type.join("&")}&max_length=${max_length}&min_length=${min_length}`,
  );
  const data = await response.json();
  return data;
}

interface HitokotoProps {
  type: string[];
  max_length: number;
  min_length: number;
}

export default async function Hitokoto({ type, max_length, min_length }: HitokotoProps) {
  if (typeof window === "undefined") {
    return null;
  } else {
    const hitokoto = await getHitokoto(type, max_length, min_length);
    return <div>{hitokoto.hitokoto}</div>;
  }
}
