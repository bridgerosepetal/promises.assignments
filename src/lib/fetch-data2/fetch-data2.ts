interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchData2(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data: Post[] = await response.json();
  data.forEach((post) => console.log(post.title));
  return data;
}
