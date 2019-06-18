import React from 'react';
import PropTypes from 'prop-types';

import Button from '../elements/Button';

const TryAgainButton = ({ onClick }) => (
	<div
		style={{
			padding: '4vH 0 4vH 0',
			width: '100vW',
			textAlign: 'center',
		}}
	>
		<Button onClick={onClick} name='Try Again' />
	</div>
);

TryAgainButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default TryAgainButton;
