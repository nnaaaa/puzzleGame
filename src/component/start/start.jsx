import './start.css'
import {useContext,useState} from 'react'
import { Data } from '../store/store'
import { Tool } from '../tool/tool'
export default function Start(){
	const { 
		screenOfUser,
		activePic,
		puzzle,setPuzzle,
		level,
		blank,setBlank
	}=useContext(Data)
	
	const [seePic,setSeePic]=useState(false)

	function move(x,y,col,row){
		if (x+level===blank.x&&y===blank.y){
			swapPos(x,y,col,row)
		}
		else if (x-level===blank.x&&y===blank.y){
			swapPos(x,y,col,row)
		}
		else if (x===blank.x&&y+level===blank.y){
			swapPos(x,y,col,row)
		}
		else if (x===blank.x&&y-level===blank.y){
			
			swapPos(x,y,col,row)
		}
	}

	function swapPos(x,y,col,row){
		x=Math.floor(x/level)
		y=Math.floor(y/level)

		const clone=new Array(puzzle.length)
		for (let i=0;i<puzzle.length;++i){
			clone[i]=puzzle[i].slice(0)
		}

		let tile=blank
		clone[row][col].position=tile

		setBlank({x:x*level,y:y*level})
		setPuzzle(clone)
		Win()
	}

	function seePicture(e){
		if (seePic==false){
			document.getElementById('rootPic').style.zIndex='0'
			e.target.innerText='Chơi tiếp'
			setSeePic(true)
		}
		else{
			document.getElementById('rootPic').style.zIndex='-1'
			e.target.innerText='Xem ảnh gốc'
			setSeePic(false)
		}
	}

	function Win(){
		let pieces=document.querySelectorAll('.piece')
		let count=1;
		for (let i=0;i<(screenOfUser*2-level)/level;++i){
			let bgPos=pieces[i].style.backgroundPosition.split('px').join('').split('-').join('').split(' ')
			let x=pieces[i].style.left.split('px').join('').split(' ')
			let y=pieces[i].style.top.split('px').join('').split(' ')
			if (bgPos[0]==x[0]&&bgPos[1]==y[0])
				count++
		}
		if (count==Math.floor((screenOfUser*2-level)/level)){
			// document.getElementById('win').style.bottom='0'
			// document.getElementById('win').style.left='100%'
			console.log('win')
		}
	}

	
	return (
		<div id='start'>
			{/* tool */}
			<Tool/>

			{/* board */}
			<div
				style={{
					height:screenOfUser,
					width:screenOfUser,
					boxShadow:'0 0 10px rgba(0,0,0,0.7)',
					position:'relative',
					background:'linear-gradient(315deg,#4dff03,#00d0ff)',
				}}
				id="board"
			>
				{puzzle.map((row,y)=>
					<div>
						{row.map((column,x)=>
							(x==puzzle.length-1&&y==0) ? '' :
								<div
									style={{
										height:`${level}px`,
										width:`${level}px`,
										backgroundImage:`url("${activePic}")`,
										backgroundPosition:`-${column.x}px -${column.y}px`,
										backgroundSize:`${screenOfUser}px`,
										boxShadow:'0 0 10px rgba(0,0,0,0.7)',
										boxSizing: 'border-box',
										position:'absolute',
										top:`${column.position.y}px`,
										left:`${column.position.x}px`
									}}
									key={`${y}${x}`}
									onClick={()=>move(column.position.x,column.position.y,x,y)}
									className="piece"
								>
								</div>
							
						)}
					</div>
				)}
			</div>

			{/* root picture */}
			<div
				style={{
					position:'absolute',
					height:screenOfUser,
					width:screenOfUser,
					background:'linear-gradient(315deg,#4dff03,#00d0ff)',
					zIndex:'-1',
					backgroundImage:`url("${activePic}")`,
					backgroundSize:`${screenOfUser}px ${screenOfUser}px`,
					backgroundRepeat:`no-repeat`
				}}
				id='rootPic'
			></div>

			{/* btn see root picture */}
			<button 
				style={{
					position:'absolute',
					bottom:'2rem'
				}}
				onClick={(e)=>seePicture(e)}
			>
				Xem ảnh gốc
			</button>
		</div>
	)   
}