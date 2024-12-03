import React from 'react'
import { news } from '../../../assets/config/news'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function News() {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const totalBooks=news.length
    const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      };
    
      const handleNext = () => {
        if (currentIndex < totalBooks - visibleNews) {
          setCurrentIndex(prev => prev + 1);
        }
      };
      const visibleNews=2
      const newsToDisplay=news.slice(currentIndex,currentIndex+visibleNews)
  return (
    <div className=''>
             <h1 className="font-bold text-2xl mb-6">News</h1>
             <div className="flex justify-start gap-3 items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className={` ${currentIndex===0 ?`cursor-not-allowed`:"cursor-pointer"}`}
        >
          <FaChevronLeft />
        </button>
          <div className={`relative overflow-hidden w-full flex justify-start gap-3 items-center transition-transform duration-500 ease-in-out`}
      >
            
            {
        newsToDisplay.length >0 && newsToDisplay.map(news => (
            <div className="flex gap-3"key={news.id}>   
              
                <div  className='mt-10'>
                    <h4 className="text-xl font-semibold hover:text-blue-600 mb-3">{news.title}</h4>
                    <p className="text-gray-600 mb-5">{news.description}</p>
                </div>
                <div className="sm:h-48  sm:flex-shrink-0 border rounded-md">
      <Link >
        <img
          src={news.image}
          alt="nothing"
          className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
        />
      </Link>
    </div>
            </div>
        ))
      }
          </div>

        <button 
          onClick={handleNext} 
          disabled={currentIndex >= totalBooks - visibleNews} 
          className={` ${currentIndex>=17 ?`cursor-not-allowed`:"cursor-pointer"}`}
        >
          <FaChevronRight />
        </button>
      </div>      
     <div className='flex gap-10 w-[165em]  mt-6'>
      
     </div>
    </div>
  )
}

export default News
