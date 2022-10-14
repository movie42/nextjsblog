import { getAllPosts, getPostBySlug } from "@/lib/readFile";
import ErrorPage from "next/error";
import markdownToHtml from "@/lib/markdownToHtml";
import PostType from "@/interfaces/post";
import { useRouter } from "next/router";

interface Props {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
}

// const fetcher = async (id: string) => {
//   const response = await fetch(`http://localhost:3000/api/posts/${id}`);
//   return await response.json();
// };

const PostPages = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
};

export default PostPages;

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
};
