import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import matter from 'gray-matter'
import { PostDetail, CategoryChip } from '../../components/'

import MdxComponents from '../../components/custom/MdxComponents'
import TableOfContent from '../../components/custom/TableOfContent'
// import LikeButton from '../../components/custom/LikeButton'

function getTableOfContents (content) {
  // eslint-disable-next-line prefer-regex-literals
  const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm')
  const headings = [...content.matchAll(regexp)]

  const tableOfContents = []

  let lastElType
  if (headings.length) {
    headings.forEach((heading) => {
      const headingText = heading[2].trim()
      const headingType = heading[1].trim() === '##' ? 'h2' : 'h3'
      const headingLink = slugify(headingText, {
        lower: true,
        strict: true
      })

      lastElType = headingType
      const head = {
        title: headingType === 'h2' ? headingText : `${headingText}`,
        headerType: headingType,
        subheading: [],
        link: `#${headingLink}`
      }
      if (headingType === 'h3') {
        // let lastEl = tableOfContents.at(-1) // vercel does not support .at method currently
        const lastEl = tableOfContents[tableOfContents.length - 1]
        if (lastElType === 'h2') {
          tableOfContents.pop()
          lastEl.subheading.push(head)
          tableOfContents.push(lastEl)
        } else {
          tableOfContents.pop()
          lastEl.subheading.push(head)
          tableOfContents.push(lastEl)
        }
      } else {
        tableOfContents.push(head)
      }
    })
  }
  return tableOfContents
}

const components = {
  h1: MdxComponents.h1,
  h2: MdxComponents.h2,
  h3: MdxComponents.h3,
  CloudinaryImage: MdxComponents.img,
  p: MdxComponents.p,
  b: MdxComponents.b,
  Adjusted: MdxComponents.Adjusted,
  Link: MdxComponents.a,
  code: MdxComponents.code,
  Accent: MdxComponents.Accent,
  QouteComponent: MdxComponents.QouteComponent,
  LgList: MdxComponents.ulLg,
  LgNumberList: MdxComponents.olLg,
  SmList: MdxComponents.ulSm,
  GithubCard: MdxComponents.GithubCard,
  test: MdxComponents.test,
  ReactPlayer: MdxComponents.ReactPlayer,
  GithubCardRepo: MdxComponents.GithubCardRepo,
  NewLine: MdxComponents.NewLine,
  Iframe: MdxComponents.Iframe,
  Table: MdxComponents.table,
  Disclosure: MdxComponents.Disclosure
}

const PostDetails = ({ data, mdxSource, toc }) => {
  return (
    <div className='layout mx-auto lg:mb-14 my-5 sm:px-2 xs:px-3 lg:px-5  text-slate-400'>
         <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-12'>
            <div className='col-span-1 lg:col-span-9'>
               <PostDetail post={data} content={mdxSource} />
               <p className='border-b  mb-4 align-middle text-center text-white'>
                  {' '}
               </p>
               <MDXRemote {...mdxSource} components={{ ...components }} lazy />

               <div className='mb-4 lg:mb-0 w-full lg:w-auto lg:mr-10 sm:mr-3'>
                  <p className='border-b mt-10  align-middle text-center text-white'>
                     {' '}
                  </p>
                  <span className='pt-5  '>
                     <CategoryChip categories={data.tags} />
                  </span>
               </div>
               {/* <Author author={post.author} /> */}
               {/* <CommentsForm slug={post.slug} /> */}
               {/* <Comments slug={post.slug} /> */}
            </div>
            <div className='hidden lg:block col-span-3 lg:col-span-3 place-content-center'>
               <TableOfContent toc={toc} />
               {/* <LikeButton/> */}
            </div>
         </div>
      </div>
  )
}

export default PostDetails

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts/blog', slug + '.mdx'),
    'utf-8'
  )

  let { content, data } = matter(markdownWithMeta)

  data = { ...data, slug }
  const toc = getTableOfContents(content)

  const mdxSource = await serialize(content)

  return {
    props: {
      data,
      mdxSource,
      toc
    }
  }
}
export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts/blog'))
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}
