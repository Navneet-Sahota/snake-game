import React from 'react';

export default class SnakeGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 0,
			board: [],
			snake: [],
			direction: 'left',
			food: [],
			score: 0,
			highScore: 0,
		};
	}

	componentDidMount() {
		this.startGame();
	}

	startGame = () => {
		let board = new Array(20);
		for (let i = 0; i < board.length; i += 1) {
			let cell = new Array(28).fill(0);
			board[i] = cell;
		}
		const snake = [[8, 12]];
		board[8][12] = 1;
		let food = [];
		do {
			food[0] = this.getRandomInt(19);
			food[1] = this.getRandomInt(27);
		} while (food[0] === 8 && food[1] === 12);
		board[food[0]][food[1]] = 2;
		this.moveSnake();
		let highScore = localStorage.getItem('highScore');
		if (highScore === null) {
			highScore = 0;
		}
		document.addEventListener('keydown', this.navigation);
		this.setState({ board, snake, food, highScore });
	};

	getRandomInt = max => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	moveSnake() {
		this.moveSnakeInterval = setInterval(() => {
			let { snake, board, food } = this.state;
			let head = [];
			switch (this.state.direction) {
				case 'left':
					head.push(snake[0][0]);
					head.push(snake[0][1] - 1);
					if (head[1] >= 0) {
						if (food[0] === head[0] && food[1] === head[1]) {
							this.generateNewFood();
						} else {
							snake.unshift(head);
							let tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								this.endGame();
							} else {
								board[head[0]][head[1]] = 1;
								board[tail[0]][tail[1]] = 0;
								this.setState({
									board,
									snake,
								});
							}
						}
					} else {
						this.endGame();
					}
					break;
				case 'up':
					head.push(snake[0][0] - 1);
					head.push(snake[0][1]);
					if (head[0] >= 0) {
						if (food[0] === head[0] && food[1] === head[1]) {
							this.generateNewFood();
						} else {
							snake.unshift(head);
							let tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								this.endGame();
							} else {
								board[head[0]][head[1]] = 1;
								board[tail[0]][tail[1]] = 0;
								this.setState({
									board,
									snake,
								});
							}
						}
					} else {
						this.endGame();
					}
					break;
				case 'right':
					head.push(snake[0][0]);
					head.push(snake[0][1] + 1);
					if (head[1] <= 27) {
						if (food[0] === head[0] && food[1] === head[1]) {
							this.generateNewFood();
						} else {
							snake.unshift(head);
							let tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								this.endGame();
							} else {
								board[head[0]][head[1]] = 1;
								board[tail[0]][tail[1]] = 0;
								this.setState({
									board,
									snake,
								});
							}
						}
					} else {
						this.endGame();
					}
					break;
				case 'down':
					head.push(snake[0][0] + 1);
					head.push(snake[0][1]);
					if (head[0] <= 19) {
						if (food[0] === head[0] && food[1] === head[1]) {
							this.generateNewFood();
						} else {
							snake.unshift(head);
							let tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								this.endGame();
							} else {
								board[head[0]][head[1]] = 1;
								board[tail[0]][tail[1]] = 0;
								this.setState({
									board,
									snake,
								});
							}
						}
					} else {
						this.endGame();
					}
					break;
				default:
			}
		}, 125);
	}

	generateNewFood = () => {
		let { food, board, snake } = this.state;
		snake.unshift([food[0], food[1]]);
		board[food[0]][food[1]] = 1;
		do {
			food[0] = this.getRandomInt(19);
			food[1] = this.getRandomInt(27);
		} while (board[food[0]][food[1]] === 1 || board[food[0]][food[1]] === 2);
		board[food[0]][food[1]] = 2;
		this.setState(
			{
				board,
				food,
			},
			() => {
				this.incrementScore();
			},
		);
	};

	incrementScore = () => {
		let { snake, score } = this.state;
		score = (snake.length - 1) * 10;
		this.setState({
			score,
		});
	};

	endGame = () => {
		clearInterval(this.moveSnakeInterval);
		alert('Game Over!');
		const { score } = this.state;
		const highScore = localStorage.getItem('highScore');
		if (score > highScore || highScore === null) {
			localStorage.setItem('highScore', score);
		}
		this.setState({ status: 1 });
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

	changeDirectionToLeft = () => {
		const { direction } = this.state;
		if (direction === 'up' || direction === 'down') {
			const newDirection = 'left';
			this.setState({
				direction: newDirection,
			});
		}
	};

	changeDirectionToUp = () => {
		const { direction } = this.state;
		if (direction === 'left' || direction === 'right') {
			const newDirection = 'up';
			this.setState({
				direction: newDirection,
			});
		}
	};

	changeDirectionToRight = () => {
		const { direction } = this.state;
		if (direction === 'up' || direction === 'down') {
			const newDirection = 'right';
			this.setState({
				direction: newDirection,
			});
		}
	};

	changeDirectionToDown = () => {
		const { direction } = this.state;
		if (direction === 'left' || direction === 'right') {
			const newDirection = 'down';
			this.setState({
				direction: newDirection,
			});
		}
	};

	restart = () => {
		this.setState(
			{
				status: 0,
				board: [],
				snake: [],
				direction: 'left',
				food: [],
				score: 0,
				highScore: 0,
			},
			() => this.startGame(),
		);
	};

	componentWillUnmount() {
		document.removeEventListener('keydown', this.navigation);
	}

	render() {
		const { board, score, highScore, status } = this.state;
		return (
			<React.Fragment>
				<h1
					style={{
						textAlign: 'center',
						margin: '0',
						padding: '2vH 0 0 0',
						color: '#0ff',
						fontSize: '5rem',
					}}
				>
					Snake Game
				</h1>
				<div
					style={{
						padding: '4vH 0 2vH 0',
						color: '#0ff',
						width: '100vW',
						textAlign: 'center',
						fontSize: '3rem',
					}}
				>
					Score: {score}
				</div>
				{status ? (
					<div
						style={{
							padding: '4vH 0 4vH 0',
							width: '100vW',
							textAlign: 'center',
						}}
					>
						<button
							style={{
								backgroundColor: 'blue',
								color: 'white',
								borderRadius: '3px',
								border: '2px solid blue',
								padding: '.75rem 1rem',
								fontSize: '2rem',
								cursor: 'pointer',
								boxShadow: '0 0 10px black',
							}}
							onClick={this.restart}
						>
							Try Again
						</button>
					</div>
				) : (
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
										backgroundColor:
											cell === 0
												? '#c4f2a9'
												: cell === 1
												? '#365cb5'
												: '#b7173d',
										width: '25px',
										height: '25px',
									}}
								/>
							)),
						)}
					</div>
				)}
				<div
					style={{
						textAlign: 'center',
						padding: '2vH 0 0 1vH',
						color: '#0ff',
						width: '100vW',
						fontSize: '3rem',
					}}
				>
					High Score: {highScore >= score ? highScore : score}
				</div>
			</React.Fragment>
		);
	}
}
