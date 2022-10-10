import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readFile } from "@/pages/api/readFile";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

interface IpostProps {
  post: { content: any };
}

const PostPages = ({ post }: IpostProps) => {
  const [html, setHtml] = useState<any>();
  const router = useRouter();
  const id = router.query.id as string;

  async function makeHtml() {
    const html = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(post.content.meta.content);

    setHtml(html.value);
  }

  useEffect(() => {
    makeHtml();
  }, []);

  return (
    <>
      <div>Post : {id}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default PostPages;

export const getStaticProps = async (context: any) => {
  const readFiles = readFile();
  const [file] = readFiles.filter((value) => {
    return String(value.meta.data.slug) === String(context.params.id);
  });

  const content = JSON.parse(JSON.stringify(file));
  return {
    props: { post: { content } }
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
