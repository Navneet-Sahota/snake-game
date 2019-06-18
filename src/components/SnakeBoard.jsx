import React from 'react';
import PropTypes from 'prop-types';

const SnakeBoard = ({ board }) => (
	<div
		style={{
			margin: '0 auto',
			width: '700px',
			height: '500px',
			display: 'flex',
			flexWrap: 'wrap',
			backgroundColor: 'white',
		}}
	>
		{board.map((row, rowIndex) =>
			row.map((cell, colIndex) => (
				<div
					key={`${rowIndex}-${colIndex}-${cell}`}
					style={{
						backgroundColor:
							cell === 0 ? '#aacc66' : cell === 1 ? '#0000ff' : '#d80404',
						width: '25px',
						height: '25px',
					}}
				/>
			)),
		)}
	</div>
);

SnakeBoard.propTypes = {
	board: PropTypes.array.isRequired,
};

export default SnakeBoard;
