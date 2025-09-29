import { addToast } from "@heroui/toast";
interface ShowTostProps {
  title: string;
  description: string;
  color:
    | "success"
    | "danger"
    | "warning"
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | undefined;
}
export default function showTost({ title, description, color }: ShowTostProps) {
  addToast({
    title: title,
    description: description,
    color: color,
    variant: "solid",
    radius: "lg",
    timeout: 1500,
  });
}
