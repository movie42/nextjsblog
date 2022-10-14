import Post from "@/interfaces/post";
import { getAllPosts } from "@/lib/readFile";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const Index = ({ posts }: Props) => {
  return (
    <ul>
      {posts?.map((post: any) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "data", "slug", "author", "excerpt"]);
  return {
    props: { posts }
  };
};
