import { baseUrl } from "./baseurl";
export default async function getUserIdbyname(username: string) {
  try {
    const response = await fetch(`${baseUrl}/api/users/search?username=${username}`);
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error(error);
  }
}
