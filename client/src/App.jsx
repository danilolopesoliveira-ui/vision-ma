import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Radar from './pages/Radar'
import Pipeline from './pages/Pipeline'
import Mercado from './pages/Mercado'
import Multiplos from './pages/Multiplos'
import Assessores from './pages/Assessores'
import Cases from './pages/Cases'
import Noticias from './pages/Noticias'
import Inteligencia from './pages/Inteligencia'
import Relatorio from './pages/Relatorio'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="radar" element={<Radar />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="mercado" element={<Mercado />} />
          <Route path="multiplos" element={<Multiplos />} />
          <Route path="assessores" element={<Assessores />} />
          <Route path="cases" element={<Cases />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="inteligencia" element={<Inteligencia />} />
          <Route path="relatorio" element={<Relatorio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
