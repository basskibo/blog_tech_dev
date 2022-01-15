import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            createdAt
            excerpt
            title
            slug
            categories {
              name
              slug
            }
            author {
              name
              bio
              id
              photo {
                url
              }
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  console.log("FETCJING DETAILS FOR POST SLUG, ", slug);
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
        createdAt
        title
        excerpt
        slug
        featuredImage {
          url
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query, { slug });
  return results.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts(){
      posts(orderBy : createdAt_ASC,
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug 
    }
  }
`;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimiliarPosts = async (categories, slug) => {
  console.log("FETCJING getSimiliarPosts FOR POST SLUG, ", slug);
  console.log("FETCJING categories FOR POST SLUG, ", categories);

  const query = gql`
    query MyQuery {
      posts(
        where: {
          slug_not: "$slug"
          AND: { categories_some: { slug_in: "$categories" } }
        }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  // const query = gql`
  //   query GetPostDetails($slug: String!, $categories: [String!]) {
  //     posts(
  //       where: {
  //         slug_not: $slug
  //         AND: { categories_some: { slug_in: $categories } }
  //       }
  //       last: 3
  //     ) {
  //       title
  //       featuredImage {
  //         url
  //       }
  //       createdAt
  //       slug
  //     }
  //   }
  // `;
  const result = await request(graphqlAPI, query, { slug, categories });
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};
