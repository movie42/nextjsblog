import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readFile } from "@/lib/readFile";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

interface PostPagesProps {
  post: any;
}

const fetcher = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  return await response.json();
};

const PostPages = ({ post }: PostPagesProps) => {
  return <div dangerouslySetInnerHTML={{ __html: post.html.value }} />;
};

export default PostPages;

export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  const getItem = async () => {
    const meta = await fetcher(id);
    const [htmlData] = meta.data.map((value: any) => value.meta.content);
    const html = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(htmlData);
    return html;
  };

  const html = JSON.parse(JSON.stringify(await getItem()));

  return {
    props: { post: { html } }
  };
};

export const getStaticPaths = async () => {
  const readFiles = readFile();
  const paths = readFiles.map((value) => ({
    params: { id: value.meta.data.slug }
  }));
  return {
    paths: [...paths],
    fallback: false
  };
};
