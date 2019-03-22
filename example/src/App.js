import React, { Component } from 'react'
import Heatmap from 'react-simple-heatmap'

// import './App.css';

const size = 7;
const data = [];
for(let i = 0; i < size; i++){
	const temp = [];
	for(let i = 0; i < 24; i++){
		temp.push(Math.round(Math.random() * 100));
	}
	data.push(temp);
}

export default class App extends Component {

  render() {
		const yLabels = [];
		for(let i = 0; i < 24; i++){
			yLabels.push(i+1 + " h");
		}

    return (
      <div className="App">
				<div
				  // className="heatMapWrapper"
					style={{ height: "500px", width: "800px", margin: "4rem auto" }}
				>
					{
						data.length > 0 && (
							<Heatmap
								showLegend={ true }
								// showData={ true }
								bgColors={ ["rgb(255, 11, 11)", "rgb(255, 255, 0)"] }
								xLabels={ ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] }
								yLabels={ yLabels }
								xStepLabel={ 2 }
								yStepLabel={ 2 }
								showTicks={ "x" }
								xLabelsStyle={{ fontWeight: "bold", fontSize: "11px" }}
								yLabelsStyle={{ fontWeight: "bold" }}
								legendStyle={{ fontWeight: "bold" }}
								bordered={ false }
								data={ data }
								onClick={ (data, x, y) => alert(`Data: ${ data }, X: ${ x }, Y: ${ y }`) }
								borderRadius={ "4px" }
							/>
						)
					}
				</div>
      </div>
    );
  }
}
