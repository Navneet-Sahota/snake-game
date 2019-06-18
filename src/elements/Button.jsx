import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, name }) => (
	<button
		type='button'
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
		onClick={onClick}
	>
		{name}
	</button>
);

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
};

export default Button;
