import React from 'react';
import Button from '../elements/Button';

const TryAgainButton = props => (
	<div
		style={{
			padding: '4vH 0 4vH 0',
			width: '100vW',
			textAlign: 'center',
		}}
	>
		<Button onClick={props.onClick} name='Try Agian' />
	</div>
);

export default TryAgainButton;
