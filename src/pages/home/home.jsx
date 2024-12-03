
import Banner from './banner'
import News from './books/News'
import Recommend from './books/recommend'
import TopSellers from './topSeller'

function Home() {
  return (
    <div>
      <div>
        <Banner/>
      </div>
      <div>
        <TopSellers/>
      </div>
      <div>
        <Recommend/>
      </div>
      <div>
        <News/>
      </div>
    </div>
  )
}

export default Home
