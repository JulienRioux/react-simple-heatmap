import React, { Fragment } from 'react';
import styles from "./Xlabels.css";

const Xlabels = props => {
	const { borderColor, xLabels, xStepLabel, showTicks, xLabelsStyle } = props;

	// Check if the ticks is rendered
	const isShowingTick = showTicks === "x" || showTicks === true;
	return (
		<Fragment>
			<div className={ styles.xLines }>
				{
					xLabels.map((x, i) => {
						if((xStepLabel && i % xStepLabel) || !isShowingTick){
							return (
								<div
								  key={ i }
									style={{ borderColor: "#0000" }}
									className={ styles.xSmallLine }></div>
							)
						}
						else {
							return (
								<div
									key={ i }
									className={ styles.xTickWrapper }>
									<div
										style={{ borderColor }}
										className={ styles.xSmallLine }></div>
								</div>
							)
						}
					})
				}
			</div>
			<div className={ styles.xLabels }>
				{
					xLabels.map((x, i) => {
						if(xStepLabel && i % xStepLabel){
							return (
								<div key={i}></div>
							)
						}

						return (
							<div
								key={ i }
								className={ styles.xTickWrapper }>
								<div
									key={ i }
									style={ xLabelsStyle }
									className={ styles.xTick }>{ x }</div>
							</div>
						)
					})
				}
			</div>
		</Fragment>
	)
}


export default Xlabels;
