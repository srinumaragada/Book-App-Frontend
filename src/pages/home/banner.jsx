import React from "react"
import banner from "../../assets/banner.png"
function Banner() {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={banner} alt="dgd" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>
                It's time to update your reading list with some of the latest and greatest releases in the literary world.
                From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
            </p>

            <button className='bg-yellow-500 py-2 px-4 text-black rounded-md'>Subscribe</button>
        </div>

       
    </div>
  )
}

export default Banner
