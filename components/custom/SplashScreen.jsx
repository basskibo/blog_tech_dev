import React from 'react'
import PropagateLoader from 'react-spinners/PacmanLoader'

const SplashScreen = ({ children, loaded }) => {
  return ((!loaded
    ? <div className="h-screen flex justify-center items-center">
  <PropagateLoader size={40} color="#ff0080" speedMultiplier={2} />
</div>
    : children))
}

export default SplashScreen
