import React from 'react';
import SnakeGame from './components/SnakeGame';

const App = () => {
	// eslint-disable-next-line no-console
	console.log(
		'%cSnake Game%cBy Navneet Singh',
		'color: #0ff; font-size: 8rem; text-align: center; display: block',
		'color: #ff0; font-size: 3rem; text-align: center; display: block',
	);
	return <SnakeGame />;
};

export default App;
