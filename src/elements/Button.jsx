import React from 'react';

const Button = props => (
	<button
		style={{
			backgroundColor: 'blue',
			color: 'white',
			borderRadius: '3px',
			border: '2px solid blue',
			padding: '.75rem 1rem',
			fontSize: '2rem',
			cursor: 'pointer',
			boxShadow: '0 0 10px 3px white',
		}}
		onClick={props.onClick}
	>
		{props.name}
	</button>
);

export default Button;
