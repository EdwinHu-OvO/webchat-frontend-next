interface FetchAvatarProps {
  username: string;
  setAvatarUrl: (avatarUrl: string) => void;
}
export default async function fetchAvatar({ username, setAvatarUrl }: FetchAvatarProps) {
  try {
    const response = await fetch(`/api/users/search?username=${username}`, {
      method: "GET",
    });
    const data = await response.json();
    if (response.ok) {
      if (data !== null) {
        if (data.avatarUrl !== null) {
          setAvatarUrl(`${data.avatarUrl}`);
        } else {
          setAvatarUrl("");
        }
      } else {
        setAvatarUrl("");
      }
    } else {
      setAvatarUrl("");
    }
  } catch (error) {
    console.error("Failed to fetch avatar:", error);
  }
}
