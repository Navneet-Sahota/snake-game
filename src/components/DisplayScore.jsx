import React from 'react';

const DisplayScore = props => (
	<div
		style={{
			padding: props.highScore ? '2vH 0 0 1vH' : '4vH 0 2vH 0',
			color: '#0ff',
			width: '100vW',
			textAlign: 'center',
			fontSize: '3rem',
		}}
	>
		{props.highScore
			? `High Score: ${props.highScore}`
			: `Score: ${props.score}`}
	</div>
);

export default DisplayScore;
