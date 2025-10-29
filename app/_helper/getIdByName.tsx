export default async function getIdByName(username: string) {
  const targetUserId = await fetch(`/api/users/search?username=${username}`);
  const targetUserIdData = await targetUserId.json();
  if (targetUserIdData === null) {
    return null;
  } else {
    return targetUserIdData.id;
  }
}
