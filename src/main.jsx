import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import { Provider } from 'react-redux'
import store from './pages/redux/store/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <RouterProvider router={routes}/>

  </Provider>
  
)
