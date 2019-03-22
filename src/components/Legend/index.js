import React, { Fragment } from 'react';
import styles from "./Legend.css"

const Legend = props => {
	let { borderColor, bordered, legendStyle, borderRadius } = props;
  // override the border color for now
	borderColor = bordered === false ? "#0000" : "borderColor";
	const border = bordered === false ? "none" : `1px solid`;
	// console.log(bordered);
	return (
		<Fragment>
			<div
				style={{
					background: `linear-gradient( ${ props.legendColors[0] } , ${ props.legendColors[1] })`,
					borderColor,
					border,
					borderRadius
				}}
				className={ styles.heatmapLegend }>
			</div>
			<div
				className={ styles.legendTicks }>
				{
					props.legendLabels.map((label, i) => (
						<div
							key={ i }
							className={ styles.tickWrapper }>
							<div
								style={{ borderColor }}
								className={ styles.smallLine }></div>
							<div
								style={ legendStyle }
								className={ styles.legendTick }>{ label }</div>
						</div>
					))
				}
			</div>
		</Fragment>
	)
}

export default Legend;
