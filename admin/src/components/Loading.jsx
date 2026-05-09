import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full'></div>
    </div>
  )
}

export default Loading;
