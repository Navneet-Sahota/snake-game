import React from 'react';

export default class SnakeGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			snake: [],
			food: [],
		};
	}

	componentDidMount() {
		let board = new Array(20);
		for (let i = 0; i < board.length; i += 1) {
			let cell = new Array(28).fill(0);
			board[i] = cell;
		}
		const snake = [[8, 12], [8, 13], [8, 14]];
		board[8][12] = 1;
		board[8][13] = 1;
		board[8][14] = 1;
		this.moveSnake('down');
		document.addEventListener('keydown', this.navigation);
		this.setState({ board, snake });
	}

	moveSnake(direction) {
		this.moveSnakeInterval = setInterval(() => {
			let { snake, board } = this.state;
			let head = [];
			switch (direction) {
				case 'left':
					head.push(snake[0][0]);
					head.push(snake[0][1] - 1);
					if (head[1] >= 0) {
						snake.unshift(head);
						let tail = snake.pop();
						board[head[0]][head[1]] = 1;
						board[tail[0]][tail[1]] = 0;
						this.setState({
							board,
							snake,
						});
					} else {
						this.endGame();
					}
					break;
				case 'up':
					head.push(snake[0][0] - 1);
					head.push(snake[0][1]);
					if (head[0] >= 0) {
						snake.unshift(head);
						let tail = snake.pop();
						board[head[0]][head[1]] = 1;
						board[tail[0]][tail[1]] = 0;
						this.setState({
							board,
							snake,
						});
					} else {
						this.endGame();
					}
					break;
				case 'right':
					head.push(snake[0][0]);
					head.push(snake[0][1] + 1);
					if (head[1] <= 27) {
						snake.unshift(head);
						let tail = snake.pop();
						board[head[0]][head[1]] = 1;
						board[tail[0]][tail[1]] = 0;
						this.setState({
							board,
							snake,
						});
					} else {
						this.endGame();
					}
					break;
				case 'down':
					head.push(snake[0][0] + 1);
					head.push(snake[0][1]);
					if (head[0] <= 19) {
						snake.unshift(head);
						let tail = snake.pop();
						board[head[0]][head[1]] = 1;
						board[tail[0]][tail[1]] = 0;
						this.setState({
							board,
							snake,
						});
					} else {
						this.endGame();
					}
					break;
				default:
			}
		}, 250);
	}

	endGame = () => {
		clearInterval(this.moveSnakeInterval);
		alert('Game Over!');
	};

	navigation = event => {
		switch (event.keyCode) {
			// Left
			case 37:
				this.changeDirectionToLeft();
				break;

			// Up
			case 38:
				this.changeDirectionToUp();
				break;

			// Right
			case 39:
				this.changeDirectionToRight();
				break;

			// Down
			case 40:
				this.changeDirectionToDown();
				break;
			default:
		}
	};

	changeDirectionToLeft = () => {};

	changeDirectionToUp = () => {};

	changeDirectionToRight = () => {};

	changeDirectionToDown = () => {};

	componentWillUnmount() {
		document.removeEventListener('keydown', this.navigation);
	}

	render() {
		const { board, snake } = this.state;
		return (
			<React.Fragment>
				<h1
					style={{
						color: 'white',
						textAlign: 'center',
						padding: '5vH',
					}}
				>
					Snake Game
				</h1>
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
								key={`${rowIndex}${colIndex}${cell}`}
								style={{
									boxSizing: 'border=box',
									backgroundColor:
										cell === 0 ? 'yellow' : cell === 1 ? 'blue' : 'red',
									width: '25px',
									height: '25px',
								}}
							/>
						)),
					)}
				</div>
				;
			</React.Fragment>
		);
	}
}
