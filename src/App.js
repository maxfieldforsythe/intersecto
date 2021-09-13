import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar'

function App() {

  //Hooks are too slow to update so I used this isntead of state
  let previous = []
  let current = []
  let shapeCounter = 1
  let shape1 = []
  let shape2 = []
  let color = 'blue'

  //Toast stuff
  const notify = (message) => toast(message);
  const deny = () => toast("Please close all shapes before calculating!");

  //Makes call to flask app for calculations
  const computeIntersect=()=>{
    var jsonData = {
      'shape1': 
        shape1,
      'shape2': 
        shape2
    }

    //If 2 shapes aren't fully formed notify user to finish them
    if(shapeCounter != 3){
      deny()
      return
    }
    axios.post(`http://localhost:5000/intersects`, jsonData).then(response => {
        if(response.data === 'True'){
          notify("These shapes intersect!")
        } else {
          notify("These shapes do not intersect :'(")
        }
        console.log("SUCCESS", response)
      }).catch(error => {
        console.log(error)
      })
  }
  
  //Canvas clock event that takes mouse coordinates and initiates drawing
  const canvasClick=(event)=>{
    let yCoord = event.pageY - event.target.offsetTop
    let xCoord = event.pageX - event.target.offsetLeft

    previous = current

    current = [xCoord,yCoord]

    //Updates current click to new coordinates and checks to see if you are within 20px of the start coordinate
    //Closes shape and/or starts new shape
    if(shapeCounter < 2){
      if(shape1.length > 0){
        if(xCoord < shape1[0][0][0] + 20 && xCoord > shape1[0][0][0] - 20 && yCoord < shape1[0][0][1] + 20 && yCoord > shape1[0][0][1] - 20 ){
          current = [shape1[0][0][0],shape1[0][0][1]]
        }
      }
    } else {
      if(shape2.length > 0){
        if(xCoord < shape2[0][0][0] + 20 && xCoord > shape2[0][0][0] - 20 && yCoord < shape2[0][0][1] + 20 && yCoord > shape2[0][0][1] - 20 ){
          current = [shape2[0][0][0],shape2[0][0][1]]
        }
      }
    }

    //Pixel for tracking of initial point
    if(shapeCounter < 3){
      drawPixel(xCoord, yCoord);
    }

    //Draws line
    if(previous.length > 0 && shapeCounter < 3){
      drawLine(previous[0],current[0],previous[1],current[1])
    }
  }

  const drawPixel=(x,y)=>{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+1, y+1);
    ctx.stroke();
  }

  //Canvas stuff to render lines
  const drawLine=(x,x1,y,y1)=>{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    if(shapeCounter < 2){
      shape1 = [...shape1, [[x,y,0],[x1,y1,0]]]
      if(JSON.stringify(shape1[shape1.length -1][1]) === JSON.stringify(shape1[0][0])){
        shapeCounter++
        previous = []
        current = []
        color = 'red'
      }
    } else {
      shape2 = [...shape2, [[x,y,0],[x1,y1,0]]]
      if(JSON.stringify(shape2[shape2.length -1][1]) === JSON.stringify(shape2[0][0])){
        shapeCounter++
        console.log(shape1)
        console.log(shape2)
      }
    }
  }

  //Initialize and reset canvas
  const initializeCanvas=()=> {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    previous = []
    current = []
    shape1 = []
    shape2 = []
    shapeCounter = 1
    color = 'blue'
  }

  useEffect(() => {
    initializeCanvas()
  });

  

  return (
    <div className="App">
      <TopBar/>
      <SideBar computeButton={computeIntersect} clearButton={initializeCanvas}/>
      <ToastContainer theme='dark'/>
      <div className="graph-container">
        <div className="page">
          <div className="data-table" onClick={canvasClick}>
            <canvas
              id="canvas"
              style={{width: '100%', height: '100%'}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
