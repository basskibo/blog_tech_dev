import React, {useState} from 'react'
import PropagateLoader from 'react-spinners/PacmanLoader'

const SplashScreen = ({ children, loaded }) => {
  const [l , setLoaded] = useState(false)
  setTimeout(()=> {
    setLoaded(true)
  },500)
  return ((!l
    ? <div className="h-screen flex justify-center items-center">
  <PropagateLoader size={40} color="#ff0080" speedMultiplier={2} />
</div>
    : children))
}

export default SplashScreen
