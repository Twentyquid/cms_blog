import React from "react";
import Categories from "../../components/Categories";
import PostWidget from "../../components/PostWidget";
import PostDetail from "../../components/PostDetail";
import Author from "../../components/Author";
import CommentsForm from "../../components/CommentsForm";
import Comments from "../../components/Comments";
import { getPostDetails, getPosts } from "../../services";

function Article({ post }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => {
                return category.slug;
              })}
            ></PostWidget>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;

export async function getStaticProps({ params }) {
  //   console.log(params);
  const data = await getPostDetails(params.slug);
  //   console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  //   console.log("slug inside getStaticPaths is: ", posts[0].node.slug);
  return {
    fallback: false,
    paths: posts.map(({ node: { slug } }) => {
      return { params: { slug } };
    }),
  };
}
