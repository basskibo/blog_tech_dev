import React from "react";
import { getPosts, getPostsWithCategory } from "../../services";
import { getAllCategories, getCategories } from "../../services";
import { Categories, PostWidget, Pagination, PostCard } from "../../components";

const PostDetails = ({ post }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 col-span-1">
        {post.map((p, index) => (
          <PostCard post={p} key={p.title} />
        ))}
        <Pagination pageNumber={1} numberOfPosts={1} numberOfPages={3} />
      </div>
      <div className="lg:col-span-4 col-span-1">
        <div className="lg:sticky relative top-8">
          <PostWidget />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostsWithCategory(params.slug);
  console.log("DATA!!!!!");
  console.log(data);
  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  console.log("$$$$### getStaticPaths ");
  const categories = await getCategories();
  // return { paths: ["/category/js", "/category/aws"], fallback: false };
  // {"paths":[{"params":{"slug":"mean"}},{"params":{"slug":"next"}},{"params":{"slug":"aws"}}],"fallback":false}
  const bla = {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
  console.log(JSON.stringify(bla));
  return bla;
}
