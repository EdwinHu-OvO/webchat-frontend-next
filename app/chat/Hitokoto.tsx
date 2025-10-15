import { Hitokoto } from "@/components/hitokoto";
export default function _Hitokoto({ hitokoto }: { hitokoto: Hitokoto }) {
  return (
    <div className="h-fit max-h-28 min-h-16 w-full rounded-lg bg-gray-100 p-2">
      <div className="text-xs text-gray-800">一言：</div>
      <div className="mb-[1rem] w-full indent-[2rem] text-sm text-gray-600">
        {hitokoto.hitokoto}
      </div>
      <div className="relative bottom-0">
        <div className="absolute right-0 bottom-0 text-xs text-gray-500">{` - ${hitokoto.from}`}</div>
      </div>
    </div>
  );
}
