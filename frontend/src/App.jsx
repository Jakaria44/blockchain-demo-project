import React from 'react'
import { ConnectWallet, useContract } from '@thirdweb-dev/react'
import Home from './components/home'
import CandidateList from './components/candidateList'
const App = () => {
    
  return (
    <div>
        <Home/>
        <CandidateList/>
    </div>
    
  )
}

export default App