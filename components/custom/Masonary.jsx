import React from 'react'
import VirtualGrid from 'react-responsive-virtual-grid'
// import PostCard from '../PostCard'
import Image from 'next/image'
import clsx from 'clsx'
// import ReadTime from '../ReadTime'
// import moment from 'moment'
import constants from '../../utils/constants'
// import CategoryChip from '../CategoryChip'
import Accent from './Accent'
import { useMediaQuery } from 'react-responsive'

const Child = ({ style, index, data, readyInViewport, scrolling }) => {
  const post = data[index]?.props
  return (
        <div
            style={{ display: 'flex', borderRadius: '15px', ...style }}>
            <a
                className={clsx(
                  post?.data?.inPreparation ? ' pointer-events-none' : ' ', 'relative flex flex-wrap  items-end justify-end flex-1 m-2 h-96 transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.99] hover:cursor-pointer transition duration-100 animate-shadow rounded-lg border border-neutral-800'
                )}

                href={`/post/${post?.data?.slug}`}
            >
                {/* <span style={{ position: 'absolute' }}>Pcisum #{index}{scrolling ? ' - Scrolling' : ''}{readyInViewport ? ' - ReadyInViewport' : ''}</span> */}
                <Image
                    alt={post?.data?.featuredImage}
                    src={post?.data?.featuredImage || 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1669989316/igutech/blogs/almos-bechtold-GFgWx3o8bTI-unsplash_nfqh81.jpg'}
                    layout='fill'
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    blurDataURL={constants.imageBlogURI}
                    placeholder='blur'
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    className={clsx(
                      post?.data?.inPreparation ? 'blur-sm' : '',
                      'object-cover '
                    )}
                />

                {/* <div className=' pt-0 self-end  text-white text-xs md:text-xs text-center leading-4'>
                             <CategoryChip className='my-0' categories={post?.data?.tags} />
                         </div> */}
                <div
                    className={clsx(post?.data?.inPreparation ? 'bg-neutral-900 text-slate-400' : 'backdrop-blur-3xl hover:bg-neutral-900  text-white',
                      'pr-3 mt-1 z-50 lg:h-2/5 xs:h-1/2  w-full bottom-0 p-3 '
                    )}>
                    <h1 className='text-lg font-semibold '> {post?.data?.title}</h1>
                    <div className='mt-1 text-white flex-row '>
                        {' '}
                        {/* <div className='basis-1/2'>
                     <ReadTime> {post}</ReadTime>
                  </div> */}

                        {/* <div className='basis-1/2'>
                            <p className='align-middle font-bold text-sm text-slate-300 mt-1'>
                                {post?.data?.inPreparation
                                  ? ''
                                  : moment(post?.data?.publishedAt).format(
                                    'MMMM DD, YYYY'
                                  )}
                            </p>
                        </div> */}
                        {/* <div className=' basis-1/2 pt-0 bottom-0 inset-x-0  text-white text-xs md:text-xs text-center leading-4'>
                             <CategoryChip className='my-0' categories={post.data.tags} />
                         </div> */}

                        <div className=' '>
                            {post?.data?.inPreparation
                              ? <p className=' my-5 bottom-0 h-64'><Accent className='w-full bg-neutral-900  font-extrabold animate-pulse'>Cooming soon...</Accent></p>
                              : <div className=''><p className='align-middle font-italic text-sm text-slate-300 mt-1 '>
                                {post?.data?.excerpt}
                            </p>
                             {/* <div className=' w-full pt-0 bottom-0 inset-x-0  text-white text-xs md:text-xs text-center leading-4'>
                             <CategoryChip className='my-0' categories={post?.data?.tags} />
                         </div> */}
                         </div>}
                        </div>
                    </div>
                </div>
            </a>
        </div>
  )
}

const App = ({ ...props }) => {
  const data = props.posts
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const cellSize = !isTabletOrMobile ? { height: 400, width: 400 } : { height: 400 }

  return (
        <section>

            <div style={{}}>
                <VirtualGrid
                    total={props.posts.length }
                    cell={cellSize}
                    child={Child}
                    childProps={{ data }}
                    viewportRowOffset={10}
                />
            </div>
        </section>
  )
}

export default App
