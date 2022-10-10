import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readFile } from "@/lib/readFile";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

interface IpostProps {
  post: { content: any };
}

const fetcher = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  return await response.json();
};

const PostPages = () => {
  const [html, setHtml] = useState<any>();
  const router = useRouter();
  const id = router.query.id as string;

  const getItem = async () => {
    const meta = await fetcher(id);
    const [htmlData] = meta.data.map((value: any) => value.meta.content);
    const html = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(htmlData);
    setHtml(html);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <div>Post : {id}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default PostPages;

export const getStaticProps = async () => {
  return {
    props: { post: {} }
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
