import React, { useState } from 'react'
// import { PostCard } from '../components'
import Accent from './custom/Accent'
import 'react-loading-skeleton/dist/skeleton.css'
import clsx from 'clsx'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import PropagateLoader from 'react-spinners/PropagateLoader'
import Virtualized from './custom/Masonary'

const getCategories = (posts) => {
  try {
    const categories = []
    posts.forEach((post) => {
      const postCategory = post.props.data.tags
      categories.push(postCategory)
    })
    const flatenedArr = categories.flat()
    function getUniqueListBy (arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()]
    }
    const unique = getUniqueListBy(flatenedArr, 'name')
    return unique
  } catch (e) {
    throw new Error(`Error parsing category: ${e.message}`)
  }
}
const BlogScreen = ({ posts }) => {
  const [chips] = useState(getCategories(posts))
  const [search, setSearch] = useState('')
  const [data, setData] = useState(posts)
  // const [items, setItems] = useState(foundPosts.slice(0, currentIndex))
  // const [featuredPost, setfeaturedPost] = useState(posts[9])

  // const fetchMoreData = () => {
  //   if (items.length >= foundPosts.length) {
  //     sethasMore(false)
  //   } else {
  //     if ((currentIndex + pointer) > lastIndex) {
  //       pointer = lastIndex - currentIndex
  //     }
  //     const nextIndex = currentIndex + pointer
  //     const newData = foundPosts.slice(currentIndex, nextIndex)
  //     setTimeout(() => {
  //       setItems(
  //         items.concat(newData)
  //       )
  //       setCurrentIndex(nextIndex)
  //     }, 1000)
  //   }
  // }

  // const findFeaturedPost = () => {
  //   posts.forEach(post => {
  //     const { data } = post.props
  //     if (data.featuredPost) {
  //       setfeaturedPost(data)
  //     }
  //   })
  // }

  const handleCategoryClick = (e) => {
    e.preventDefault()
    const selected = e.target.innerText
    if (selected === search) {
      setSearch('')
      setData(posts)
      return
    }
    setSearch(selected)
    const postsWithCategory = []

    posts.filter((el, index) => {
      // if no input the return the original
      const data = el.props.data
      if (selected === '') {
        postsWithCategory.push(posts[index])
      } else {
        // return the item which contains the user input
        data.tags.forEach((tag) => {
          if (tag.name === selected) {
            postsWithCategory.push(posts[index])
          }
        })
      }
      return true
    })

    setData(postsWithCategory)
  }
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
    const filteredData = posts.filter((el) => {
      // if no input the return the original
      const data = el.props.data
      if (search === '') {
        return data
      } else {
        const includes =
               data.title
                 .toLowerCase()
                 .includes(e.target.value.toLowerCase()) ||
               data.excerpt
                 .toLowerCase()
                 .includes(e.target.value.toLowerCase())
        return includes
      }
    })
    setData(filteredData)
  }

  return (
    <div className='layout mx-auto lg:my-14 my-5 sm:px-2 xs:px-3 lg:px-5  text-slate-400'>
         <div className='my-8 ' id="scrollableDiv">
            <h1 className='mb-5'>
               <Accent className='font-extrabold text-5xl'>Blog</Accent>
            </h1>

            <p className='display-4 '>
               In order not to wander in the dark (as I did with some things)
               until I found a solution, I wrote some things so that one day
               some unknown hero might be helped.
            </p>
            {/* <MdSearch /> */}
            <input
               className='w-full lg:w-4/4 my-3 bg-neutral-900  px-3 py-2 rounded-md border border-slate-600 focus:border-lime-600 flex-grow focus:outline-none cursor-text'
               placeholder='Search...'
               value={search}
               type='search'
               onChange={handleSearchChange}
            />

            <div className='mt-1 mb-7 lg:mb-10 lg:w-4/4'>
               {chips
                 ? (
                     chips.map((category) => (
                     <span key={category.slug}>
                        <a
                           className='inline-flex'
                           disabled={true}
                           onClick={handleCategoryClick}>
                           <span
                              className={clsx(
                                // eslint-disable-next-line no-constant-condition
                                'flex items-center m-1 justify-cente opacity-80 text-white font-bold rounded-lg text-xs px-2 py-1 border-1 border-teal-700 bg-[#7928ca] hover:bg-[#ff0080] hover:text-white hover:cursor-pointer transition duration-500 ease-in-out', '' ? '' : '',
                                search === category.name
                                  ? ' underline decoration-solid decoration-2decoration-lime-400 text-lime-400 underline-offset-4 '
                                  : 'text-white'
                              )}>
                              {category.name}
                           </span>
                        </a>
                     </span>
                     ))
                   )
                 : (
                  <></>
                   )}
            </div>
         </div>
         {/* <div className='my-8  rounded-xl'>
            <div className='flex flex-row gap-5'>
              <div className='basis-1/1 md:basis-2/3 '>
              <PostCard
                    mode="xl"
                    key={featuredPost.props.data.slug}
                    post={featuredPost.props}
                />
              </div>
              <div className='basis-1/1 md:basis-1/3 '>
            <PostCard
                    mode="md"
                    key={featuredPost.props.data.slug}
                    post={featuredPost.props}
                />
                <PostCard
                mode="md"
                key={featuredPost.props.data.slug}
                post={featuredPost.props}
            />
            </div>
            </div>
         </div> */}
         {/* <hr className='my-10'/> */}
<div className=' w-full'>
<Virtualized posts={data} />

</div>
         {/* <InfiniteScroll
          dataLength={items.length}
          element={'span'}
          next={fetchMoreData}
          hasMore={hasMore}
          className=' grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-7 mb-5 pb-5'
        >
          {items.map((post, index) => (
                  <PostCard
                    className=''
                    mode="md"
                    key={post.props.data.slug}
                    post={post.props}
                />
          ))}
        </InfiniteScroll> */}
      </div>
  )
}

export default BlogScreen
