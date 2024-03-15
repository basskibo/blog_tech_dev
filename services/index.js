import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async (last) => {
  console.log(last)
  const query = gql`
      query GetPosts($last: Int) {
         postsConnection(last: $last, stage: PUBLISHED) {
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
   `

  const results = await request(graphqlAPI, query)
  return results.postsConnection.edges
}

export const getPostDetails = async (slug) => {
  console.log('FETCJING DETAILS FOR POST SLUG, ', slug)
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
   `

  const results = await request(graphqlAPI, query, { slug })
  return results.post
}

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
`
  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getSimiliarPosts = async (categories, slug) => {
  console.log('FETCJING getSimiliarPosts FOR POST SLUG, ', slug)
  console.log('FETCJING categories FOR POST SLUG, ', categories)

  const query = gql`
      query GetSimiliarPosts($slug: String!, $categories: [String!]) {
         posts(
            where: {
               slug_not: $slug
               AND: { categories_some: { slug_in: $categories } }
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
   `

  const result = await request(graphqlAPI, query, { slug, categories })
  console.log(query)
  return result.posts
}

export const getCategories = async () => {
  const query = gql`
      query MyQuery {
         categories {
            name
            slug
         }
      }
   `

  const result = await request(graphqlAPI, query)
  return result.categories
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
      query GetComments($slug: String!) {
         comments(where: { post: { slug: $slug } }, last: 10) {
            name
            createdAt
            comment
         }
      }
   `

  const result = await request(graphqlAPI, query, { slug })
  return result.comments
}

export const getPostsWithCategory = async (slug) => {
  console.log('getPostsWithCategory SLUG, ', slug)
  const query = gql`
      query getPostsWithCategory($slug: String!) {
         categories(where: { slug: $slug }) {
            id
            post {
               slug
               title
               excerpt
               author {
                  name
                  photo {
                     url
                  }
               }
               createdAt
               featuredImage {
                  url
               }
            }
         }
      }
   `

  const results = await request(graphqlAPI, query, { slug })
  return results.categories[0].post
}
