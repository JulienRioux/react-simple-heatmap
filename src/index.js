import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'


class Heatmap extends Component {
	  static propTypes = {
			data: PropTypes.arrayOf(
					PropTypes.arrayOf(PropTypes.number).isRequired
				).isRequired,
			bgColor: PropTypes.string,
			showData: PropTypes.bool,
			showLabels: PropTypes.bool,
			showLegend: PropTypes.bool
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

	handleClick = (data) => {
		if(this.props.onClick){
			this.props.onClick(data);
		}
	}

  render() {
		const { min, max } = this.state;
		const { data, bgColor } = this.props;

		const numX = data.length;
		// const numY = data[0].length;

		// It dont work because of the formula is wrong... (length of 20 !== 20%);
		const height = 1 / (numX / 100) + "%";

		let backgroundColor = bgColor ? bgColor : "rgb(24, 144, 255)";
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

		// const legendLabels = [0, 0.2, 0.4, 0.6, 0.8, 1];
		const yLabels = [0, 0.2, 0.4, 0.6, 0.8, 1];
		const xLabels = [0, 0.2, 0.4, 0.6, 0.8, 1];

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

		// console.log(legendLabels);

		const borderColor = "#314659";

		// Check if the heatmap need a border
		const borderStyle = this.props.bordered === false ? "none" : "1px solid";


		// To finished!
		const showXLabels = false;
		const showYLabels = false;

    return (
			<div className={ styles.mainWrapper }>

				<div className={ styles.heatMapAndXlabels }>
					<div className={ styles.heatmapAndYlabels }>
						{
							showYLabels && (
								<div className={ styles.yLabels }>
									{
										yLabels.map((y, i) => (
											<div
												key={ i }
												className={ styles.tickWrapper }>
												<div
													className={ styles.legendTick }>{ y }</div>
												<div
													style={{ borderColor }}
													className={ styles.smallLine }></div>
											</div>
										))
									}
								</div>
							)
						}

						<div
							style={{ border: borderStyle, borderColor }}
							className={ styles.heatMap }>
							{
								data.map((row, i) => (
									<div
										key={ i }
										className={ styles.heatMapRow }>
										{
											row.map((square, j) => {
												const opacity = (square - min) * mult;
												const bgColor = backgroundColor + opacity + ")";
												return (
													<div
														key={ i + "" + j }
														className={ styles.square }
														onClick={ () => this.handleClick(square) }
														style={{ ...squareStyle, backgroundColor: bgColor }}>
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
							this.props.showLegend && min && (
								<Fragment>
									<div
										style={{ background: `linear-gradient( ${legendColor} , #fff)`, borderColor }}
										className={ styles.heatmapLegend }>
									</div>
									<div
										className={ styles.legendTicks }>
										{
											legendLabels.map((label, i) => (
												<div
													key={ i }
													className={ styles.tickWrapper }>
													<div
														style={{ borderColor }}
														className={ styles.smallLine }></div>
													<div
														className={ styles.legendTick }>{ label }</div>
												</div>
											))
										}
									</div>
								</Fragment>
							)
						}
					</div>

					{
						showXLabels && (
							<Fragment>
								<div className={ styles.xLines }>
									{
										xLabels.map((x, i) => (
											<div
												key={ i }
												className={ styles.xTickWrapper }>
												<div
													style={{ borderColor }}
													className={ styles.xSmallLine }></div>
											</div>
										))
									}
								</div>
								<div className={ styles.xLabels }>
									{
										xLabels.map((x, i) => (
											<div
												key={ i }
												className={ styles.xTickWrapper }>
												<div
													key={ i }
													className={ styles.xTick }>{ x }</div>
											</div>
										))
									}
								</div>
							</Fragment>
						)
					}
				</div>
			</div>
    );
  }
}

export default Heatmap;
