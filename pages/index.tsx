import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const fetcher = async () => {
  const response = await fetch("http://localhost:3000/api/posts");
  const { posts } = await response.json();
  return posts;
};

const Home: NextPage = (context: any) => {
  const [posts, setPosts] = useState<any[]>();

  const getItem = async () => {
    const data = await fetcher();

    setPosts(data);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <ul>
      {posts?.map((post: any) => (
        <li key={post.meta.data.slug}>
          <Link href={`/post/${post.meta.data.slug}`}>
            {post.meta.data.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;
