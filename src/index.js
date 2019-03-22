import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Legend from "./components/Legend";
import Xlabels from "./components/Xlabels";
import Ylabels from "./components/Ylabels";

import styles from './styles.css';

class Heatmap extends Component {
	  static propTypes = {
			data: PropTypes.arrayOf(
					PropTypes.arrayOf(PropTypes.number).isRequired
				).isRequired,
			bgColors: PropTypes.arrayOf(PropTypes.string),
			showData: PropTypes.bool,
			showLabels: PropTypes.bool,
			showLegend: PropTypes.bool,
			xStepLabel: PropTypes.number,
			yStepLabel: PropTypes.number,
			showTicks: PropTypes.oneOfType([
			  PropTypes.string,
			  PropTypes.bool
			]),
			xLabelsStyle: PropTypes.object,
			yLabelsStyle: PropTypes.object,
			legendStyle: PropTypes.object,
			borderRadius: PropTypes.string
	  }
	state = {
		min: undefined,
		max: undefined
	}

	componentDidMount(){
		// this.setState()
		// get the min and max
		let max;
		let min;
		this.props.data.forEach(row => {
			row.forEach(item => {
				if(item > max || max === undefined){
					max = item;
				}
				if(item < min || min === undefined){
					min = item;
				}
			})
		})
		// put the min and max in the state
		this.setState({ min, max });
	}

	handleClick = (data, x, y) => {
		// If there is a onClick event, add it to every square
		if(this.props.onClick){
			this.props.onClick(data, x, y);
		}
	}

  render() {
		const { min, max } = this.state;
		let { data, bgColors, xLabels, yLabels, labelsFontSize } = this.props;

		// const numX = data.length;
		const numY = data[0].length;

		// It dont work because of the formula is wrong... (length of 20 !== 20%);
		const height = 1 / (numY / 100) + "%";

		// Set the default color if not provided
		bgColors = bgColors ? bgColors : ["rgb(24, 144, 255)", "rgb(255, 255, 255)"];

		// Add a bgColor (white) if only one color is provided
		bgColors = bgColors.length > 1 ? bgColors : [bgColors[0], "rgb(255, 255, 255)"];


		let backgroundColor = bgColors ? bgColors[0] : "rgb(24, 144, 255)";

		const legendColor = backgroundColor;
		backgroundColor = backgroundColor.split(")")[0].split("rgb")[1] + ", ";
		backgroundColor = "rgba" + backgroundColor;

		const squareStyle = {
			backgroundColor: backgroundColor,
			height: height,
			width: "100%",
		}

		// Get the multiplier for the opacity
		const mult = 1 / (max - min);

		const borderColor = "#314659";

		// Create the legend
		const legendLabels = [];
		const numSteps = 5;
		const legendRange = Math.round(max * 10) / 10 - Math.round(min * 10) / 10;
		const legendStep = Math.round(legendRange / numSteps * 10) / 10;
		for(let i = 0; i <= numSteps; i++){
			let legendItem = min + (i * legendStep);
			legendItem = Math.round(legendItem * 10) / 10
			legendLabels.push(legendItem);
		}

		// console.log("legendStep", legendLabels);

		// console.log(legendLabels);

		// Check if the heatmap need a border
		const borderStyle = this.props.bordered === false ? "none" : "1px solid";


    return (
			<div className={ styles.titleAndHeatmap }>
				<div className={ styles.mainWrapper }>
					<div className={ styles.heatMapAndXlabels }>
						<div className={ styles.heatmapAndYlabels }>
							{
								yLabels && (
									<Ylabels
									  borderColor={ borderColor }
										yLabels={ yLabels }
										yStepLabel={ this.props.yStepLabel }
										showTicks={ this.props.showTicks }
										yLabelsStyle={ this.props.yLabelsStyle } />
								)
							}

							<div
								style={{
									border: borderStyle,
									borderColor,
									backgroundColor: bgColors[1],
									borderRadius: this.props.borderRadius
								}}
								className={ styles.heatMap }>
								{
									data.map((row, i) => (
										<div
											key={ i }
											className={ styles.heatMapRow }>
											{
												row.map((square, j) => {
													const opacity = (square - min) * mult;
													const bgColors = backgroundColor + opacity + ")";
													const x = i;
													const y = (row.length - 1) - j;
													return (
														<div
															key={ i + "" + j }
															className={ styles.square }
															onClick={ () => this.handleClick(square, x, y) }
															style={{ ...squareStyle, backgroundColor: bgColors }}>
															{ this.props.showData && square }
														</div>
													)
												})
											}
										</div>
									))
								}
							</div>
							{
								this.props.showLegend && (min !== undefined && min !== "NaN")  && (
									<Legend
									  legendLabels={ legendLabels }
									  legendColors={ bgColors }
										borderColor={ borderColor }
										bordered={ this.props.bordered }
										legendStyle={ this.props.legendStyle }
										borderRadius={ this.props.borderRadius } />
								)
							}
						</div>

						{
							xLabels && (
								<Xlabels
								  borderColor={ borderColor }
									xLabels={ xLabels }
									xStepLabel={ this.props.xStepLabel }
									showTicks={ this.props.showTicks }
									xLabelsStyle={ this.props.xLabelsStyle } />
							)
						}
					</div>
				</div>
			</div>
    );
  }
}

export default Heatmap;
