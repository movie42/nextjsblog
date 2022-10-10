import Link from "next/link";
import React from "react";
import { readFile } from "../api/readFile";

interface IpostProps {
  posts: any;
}

const post = ({ posts }: IpostProps) => {
  console.log(posts.data);
  return (
    <div>
      <ul>
        {posts.data.map((post) => (
          <li>
            <Link href={`/post/${post.path}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default post;

export const getStaticProps = async (context: any) => {
  const readFiles = readFile();
  const data = readFiles.map((value) => ({
    title: value.meta.data.title,
    description: value.meta.data.description,
    path: value.meta.data.slug,
    date: value.meta.data.date
  }));

  return {
    props: { posts: { data } }
  };
};
