import React from "react";
import { useRouter } from "next/router";

interface IpostProps {}

const PostPages = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return <div>Post : {id}</div>;
};

export default PostPages;
