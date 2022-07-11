import Home from './components/Home.js'
import Dashboard from './components/Dashboard.js';
import Onboarding from './components/Onboarding.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const App=()=> {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {authToken&&<Route path="/dashboard" element={<Dashboard/>}/>}
        {authToken&&<Route path="/onboarding" element={<Onboarding/>}/>}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
