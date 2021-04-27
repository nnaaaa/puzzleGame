import { useState,useEffect,useContext } from "react";
import Dropdown from 'react-dropdown';
import { Data } from '../store/store'
import 'react-dropdown/style.css';
import './tool.css'

export function Tool(){
  const {
    setLevel,
    setBlank,
    screenOfUser
  }= useContext(Data)

  const level=[
    {
      label:'Dễ',
      value:200
    },
    {
      label:'Thường',
      value:100
    },
    {
      label:'Khó',
      value:50
    },
    {
      label:'Rất khó',
      value:25
    }
  ]

  function chosePic(){
    document.getElementById('background').style.left='0'
  }

  function setUp(level){
    setLevel(level)
    setBlank({x:screenOfUser-level,y:0})
  }

  return(
    <div id='wrapper'>
      <button onClick={()=>chosePic()}>Chọn hình</button>
      <span>
      <Dropdown 
        placeholder="Chọn độ khó"
        options={level}
        onChange={(chosen)=>setUp(chosen.value)}
      />
      </span>
      
    </div>
  )
}