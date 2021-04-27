import  { createContext, useState, useEffect } from 'react'


import nobita from '../image/nobita.jpg'
import doremon from '../image/doremon.jpg'
import thanhphuong from '../image/thanhphuong.jpg'
import luffy from '../image/luffy.jpg'
import sunFlower from '../image/sunFlower.jpg'
import aurelionSol from '../image/aurelionSol.png'
import yasuo from '../image/yasuo.jpg'
import sena from '../image/sena.jpg'
import huanrose from '../image/huanrose.jpg'

export const Data=createContext()

export function DataProvider({children}){
  const image=[
    {
      url:nobita,
    },
    {
      url:doremon,
    },
    {
      url:thanhphuong
    },
    {
      url:aurelionSol
    },
    {
      url:luffy
    },
    {
      url:sunFlower
    },
    {
      url:sena
    },
    {
      url:huanrose
    },
    {
      url:yasuo
    },
  ]
  const screenOfUser=Math.floor(
    (window.innerWidth<window.innerHeight ? window.innerWidth : window.innerHeight)/100
  )*100

  const [activePic,setActivePic]=useState();
  const [puzzle,setPuzzle]=useState([])
  const [level,setLevel]=useState(50)
  const [blank,setBlank]=useState({x:screenOfUser-level,y:0})


	useEffect(()=>{
      let id=0
      const puzzleBlank=[]
			for (let y=0;y<screenOfUser;y+=level){
				let row=[]
				for (let x=0;x<screenOfUser;x+=level){
					row.push({
						x,y,
            position:{x:x,y:y},
            id:id++
					})
				}
				puzzleBlank.push(row)
			}

      const cloneArr=[]
      id=0
      for (let i=0;i<puzzleBlank.length;++i){
        let row=[]
        for (let j=0;j<puzzleBlank.length;++j){
          row.push({
						x:j,y:i,
            position:{x:j,y:i},
            id:id++
					})
        }
        cloneArr.push(row)
      }

      let clone=[]
      for (let i=0;i<id;++i){
        clone.push(i)
      }

      let i=0,j=0
      while (clone.length!=0){
        let x
        let check=true
        while (check){
          x=Math.floor(Math.random() * id) 
          clone.forEach(id=>{
            if (id==x)
              check=false
          })       
        }
        

        clone=clone.filter(id=>id!=x)

        puzzleBlank.forEach(row=>{
          row.forEach(col=>{
            if (col.id==x){
              cloneArr[i][j].x=col.x
              cloneArr[i][j].y=col.y
              cloneArr[i][j].position={x:j*level,y:i*level}
              cloneArr[i][j].id=x
            }
          })
        })

        if (j==puzzleBlank.length-1){
          if (i<puzzleBlank.length)
            i++
          j=0
        }
        else {
          j++
        }
        
        clone=clone.filter(id=>id!=x)
      }
    
			setPuzzle(cloneArr)
	},[level])

  return (
    <Data.Provider
      value={{
        image,screenOfUser,
        activePic,setActivePic,
        puzzle,setPuzzle,
        level,setLevel,
        blank,setBlank
      }}
    >
      {children}
    </Data.Provider>
  )
}
