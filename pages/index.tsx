import { PostItem } from "@/components";
import PostsListItemContainer from "@/components/postsContainer";
import Post from "@/interfaces/post";
import { getAllPosts } from "@/lib/readFile";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const Index = ({ posts }: Props) => {
  return (
    <PostsListItemContainer>
      {posts?.map((post: any) => (
        <PostItem key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </PostItem>
      ))}
    </PostsListItemContainer>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "data", "slug", "author", "excerpt"]);
  return {
    props: { posts }
  };
};
