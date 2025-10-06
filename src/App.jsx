import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import FlexBuilder from './pages/FlexBuilder.jsx'
import GridBuilder from './pages/GridBuilder.jsx'
import FormBuilder from './pages/FormBuilder.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/flex" element={<FlexBuilder />}/>
          <Route path="/grid" element={<GridBuilder />}/>
          <Route path="/form" element={<FormBuilder/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  ) 
}