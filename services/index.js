import { request , gql } from 'graphql-request';
 
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async( ) => {
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
      
    `


    const results = await request(graphqlAPI, query);
        console.log(results.postsConnection.edges)
    return results.postsConnection.edges;
}
