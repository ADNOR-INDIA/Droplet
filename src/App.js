import Home from './components/Home.js'
import Dashboard from './components/Dashboard.js';
import Onboarding from './components/Onboarding.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>
        <Route path={"/onboarding"} element={<Onboarding/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
