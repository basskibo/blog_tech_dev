import React, { useCallback, useState } from 'react'
import confetti from 'canvas-confetti'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

const LikeButton = (args) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(Math.ceil(Math.random() * 100))
  const [clicked, setClicked] = useState(0)
  const onClick = useCallback(() => {
    if (clicked < 3) {
      confetti({
        particleCount: 350,
        spread: 200,
        // startVelocity: 30,
        // angle: 120,
        origin: {
          // x: 0.8
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
    <div className=''>
        <button className="flex justify-center" onClick={onClick} >
        {liked ? <BsHeartFill className='text-3xl  mx-1 text-red-800' /> : <BsHeart className='text-3xl text-neutral-300  mx-1' />}
        <span className='text-neutral-500 ml-1 text-xl'>{likes}</span>
        </button>
    </div>
  )
}

export default LikeButton
