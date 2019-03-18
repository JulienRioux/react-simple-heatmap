import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'


class Heatmap extends Component {
	  static propTypes = {
			data: PropTypes.arrayOf(
					PropTypes.arrayOf(PropTypes.number).isRequired
				).isRequired,
			bgColor: PropTypes.string,
			showLabels: PropTypes.bool
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
			this.props.onClick(square);
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
		backgroundColor = backgroundColor.split(")")[0].split("rgb")[1] + ", ";
		backgroundColor = "rgba" + backgroundColor;

		const squareStyle = {
			backgroundColor: backgroundColor,
			height: height,
			width: "100%",
		}

		// Get the multiplier for the opacity
		const mult = 1 / (max - min);


    return (
			<Fragment>
				<div className={ styles.heatMap }>
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
												{ this.props.showLabels && square }
											</div>
										)
									})
								}
							</div>
						))
					}
					<div></div>
				</div>
			</Fragment>
    );
  }
}

export default Heatmap;
