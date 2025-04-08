import React from 'react'

const Wrapper = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div className=' border border-[#DADADA] rounded-2xl p-2.5 gap-2.5 flex'>
        {children}
    </div>
  )
}

export default Wrapper