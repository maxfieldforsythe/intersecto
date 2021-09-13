import React from 'react'

export default function TopBar(props) {
    return (
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
        <button className="buttons" onClick={props.computeButton}>
          Calculate
        </button>
        <button className="buttons" onClick={props.clearButton}>
          Clear Canvas
        </button>
      </div>
    )
}
