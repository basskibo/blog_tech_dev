import React, { useCallback, useState } from 'react'
import confetti from 'canvas-confetti'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

const LikeButton = (args) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(100)
  const [clicked, setClicked] = useState(0)

  const onClick = useCallback(() => {
    if (clicked < 3) {
      confetti({
        particleCount: 350,
        spread: 200,
        startVelocity: 30,
        angle: 120,
        origin: {
          x: 0.8
          // since they fall down, start a bit higher than random
          // y: Math.random() - 0.2
        }
      })
      console.log('l ', likes)
      setLiked(true)
      setLikes(likes + 1)
      setClicked(clicked + 1)
      console.log('clicked', clicked, ' likes', likes)
    }
  }, [likes])

  return (
    <div className='md:my-5 lg:my-10  mx-5 mb-5 sticky top-40 md:top-30 lg:top-50'>
        <button className="flex" onClick={onClick} >
        {/* <span>🎉</span> */}
        {liked ? <BsHeartFill className='text-xl my-1 mx-1 text-red-800' /> : <BsHeart className='text-xl text-neutral-300 my-1 mx-1' />}
        <span className='text-neutral-500'>{likes}</span>
        </button>
    </div>
  )
}

export default LikeButton
