export default async function isOwner(userId: string, groupId: string) {
  // 后端没有提供相应的接口，群成员列表的第一个就是群主
  // 查询群成员列表
  const response = await fetch(`/api/groups/${groupId}/members`);
  const data = await response.json();
  // 判断第一个成员是否是当前用户
  return data[0].id === userId;
}
