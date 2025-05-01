import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const LoadingSpinner = () => {
  return (
  
      <div style={{ textAlign: "center", padding: "50px" }}>
      <FaSpinner style={{ fontSize: "30px", animation: "spin 1s linear infinite" }} />
    </div>
    
  )
}

export default LoadingSpinner
