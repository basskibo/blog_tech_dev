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
            authors {
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

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
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

export const getSimiliarPosts = async () => {
  const query = gql`
    query GetPostDetails({$slug : String! , $categories : [String!]}){
      posts(where : {slug_not: $slug, AND: {categories_name : {slug_in: $categories}}},
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug 
    }

`;
  const result = await request(graphqlAPI, query);
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
  console.log(query);
  const result = await request(graphqlAPI, query);
  console.log("CAT", result);
  return result.categories;
};
