import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './components/TopBar';

function App() {

  let previous = []
  let current = []
  let shapeCounter = 1
  let shape1 = []
  let shape2 = []
  let color = 'blue'

  const notify = (message) => toast(message);
  const deny = () => toast("Please close all shapes before calculating!");

  const computeIntersect=()=>{
    var jsonShit = {
      'shape1': 
        shape1,
      'shape2': 
        shape2
    }

    if(shapeCounter != 3){
      deny()
      return
    }
    axios.post(`https://flask-container-service.82ruic243qqso.us-east-1.cs.amazonlightsail.com/intersects`, jsonShit).then(response => {
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
  
  const canvasClick=(event)=>{
    let yCoord = event.pageY - event.target.offsetTop
    let xCoord = event.pageX - event.target.offsetLeft

    previous = current

    current = [xCoord,yCoord]

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

    if(shapeCounter < 3){
      drawPixel(xCoord, yCoord);
    }

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
      <div className="layout-sidebar">
        <div style={{marginTop: '20px', color: '#fff'}}>
          Menu/Tutorial
        </div>
        <div style={{height: '2px', width: '85%', background: '#fff'}}/>
        <div className="sidebar-subtext">
          Welcome!<br/>
          To begin placing shapes click on the canvas to the right. To close a shape click near the starting point. After the first shape is closed you can begin drawing the second one. 
          Feel free to clear the canvas to restart. The calculate button will tell you if they are intersecting.
        </div>
        <button onClick={computeIntersect}>
          Calculate
        </button>
        <ToastContainer theme='dark'/>
        <button onClick={initializeCanvas}>
          Clear Canvas
        </button>
      </div>
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
