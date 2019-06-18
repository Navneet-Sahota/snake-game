import React from 'react';
import PropTypes from 'prop-types';

const DisplayScore = ({ highScore, score }) => (
	<div
		style={{
			padding: highScore ? '2vH 0 0 1vH' : '4vH 0 2vH 0',
			color: '#0ff',
			width: '100vW',
			textAlign: 'center',
			fontSize: '3rem',
		}}
	>
		{highScore || highScore === 0
			? `High Score: ${highScore}`
			: `Score: ${score}`}
	</div>
);

DisplayScore.propTypes = {
	highScore: PropTypes.number,
	score: PropTypes.number,
};

export default DisplayScore;
