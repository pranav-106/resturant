import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Restaurantdata from './pages/Restaurantdata';
import ImageSearch from './pages/ImageSearch';
import DescriptionSearch from './pages/DescriptionSearch';
function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/restaurantdata"
            element={<Restaurantdata/>}
          />
          <Route
            path="/imgsearch"
            element={<ImageSearch/>}
          />
          <Route
            path="/descriptionsearch"
            element={<DescriptionSearch/>}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
