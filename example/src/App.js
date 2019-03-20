import React, { Component } from 'react'
import Heatmap from 'react-simple-heatmap'

import './App.css';

const size = 10;
const data = [];
for(let i = 0; i < size; i++){
	const temp = [];
	for(let i = 0; i < size; i++){
		temp.push(Math.round(Math.random() * 100) / 100);
	}
	data.push(temp);
}

export default class App extends Component {

  render() {
    return (
      <div className="App">
				<div
					style={{ height: "500px", width: "600px" }}>
					{
						data.length > 0 && (
							<Heatmap
								// title="React-Simple-Heatmap"
								// showLabels={ true }
								showLegend={ true }
								// showData={ true }
								// bgColor={ "rgb(255, 17, 17)" }
								// bordered={ false }
								data={ data }
								// onClick={ (data) => console.log(data) }
							/>
						)
					}
				</div>
      </div>
    );
  }
}
