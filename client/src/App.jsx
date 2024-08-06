import React from 'react'
import Referee from './components/Referee/Referee'
// import Chessboard from './components/Chessboard/Chessboard'

import './App.css'


const App = () => {
  const isMobile = navigator.userAgentData.mobile
  if(isMobile){
    alert("CAN'T PLAY ON MOBILE OR TABLET \n PLEASE SWITCH TO DESKTOP")
  }
  return (
    <div>
      <Referee />
      {/* <Chessboard /> */}
    </div>
  )
}

export default App