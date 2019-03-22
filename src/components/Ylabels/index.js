import React, { Fragment } from 'react';
import styles from "./Ylabels.css";

const Ylabels = props => {
	let { borderColor, yLabels, yStepLabel, showTicks, yLabelsStyle } = props;
	// Create a variable that will pass labels
	// showTicks = true;
	// remove the bordercolor if the user dont want ticks
	const isShowingTick = showTicks === "y" || showTicks === true;
	borderColor = isShowingTick ? borderColor : "#0000";

	return (
		<div className={ styles.yLabels }>
			<Fragment>
				{
					yLabels.map((y, i) => {
						if(yStepLabel && i % yStepLabel){
							return (
								<div key={ i }></div>
							)
						}
						return (
							<div
								key={ i }
								className={ styles.tickWrapper }>
								<div
									style={ yLabelsStyle }
									className={ styles.yTick }>{ y }</div>
								<div
									style={{ borderColor }}
									className={ styles.smallLine }></div>
							</div>
						)
					})
				}
			</Fragment>
		</div>
	)
}

export default Ylabels;
