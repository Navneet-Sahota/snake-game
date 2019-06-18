/* eslint-disable object-curly-newline */
import React from 'react';
import Header from './Header';
import DisplayScore from './DisplayScore';
import TryAgainButton from './TryAgainButton';
import SnakeBoard from './SnakeBoard';

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

	componentWillUnmount() {
		document.removeEventListener('keydown', this.navigation);
	}

	startGame = () => {
		const board = new Array(20);
		let highScore = localStorage.getItem('highScore');
		const food = [];
		// Head of the Snake
		const snake = [[8, 12]];
		for (let i = 0; i < board.length; i += 1) {
			const cell = new Array(28).fill(0);
			board[i] = cell;
		}
		// if board cell is 1, then Snake's body is at that cell
		board[8][12] = 1;
		do {
			food[0] = this.getRandomInt(19);
			food[1] = this.getRandomInt(27);
		} while (food[0] === 8 && food[1] === 12);
		// if board cell is 2, then food is present at that cell
		board[food[0]][food[1]] = 2;
		this.moveSnake();
		if (highScore === null) {
			highScore = 0;
		}
		document.addEventListener('keydown', this.navigation);
		this.setState({
			board,
			snake,
			food,
			highScore,
		});
	};

	getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

	moveSnake = () => {
		this.moveSnakeInterval = setInterval(() => {
			const { snake, board, food, direction } = this.state;
			const head = [];
			switch (direction) {
				case 'left':
					head.push(snake[0][0]);
					head.push(snake[0][1] - 1);
					if (head[1] >= 0) {
						if (food[0] === head[0] && food[1] === head[1]) {
							this.generateNewFood();
						} else {
							snake.unshift(head);
							const tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								// snake overlaps
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
							const tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								// snake overlaps
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
							const tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								// snake overlaps
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
							const tail = snake.pop();
							if (board[head[0]][head[1]] === 1) {
								// snake overlaps
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
	};

	generateNewFood = () => {
		const { food, board, snake } = this.state;
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
		const { snake } = this.state;
		let { score } = this.state;
		score = (snake.length - 1) * 10;
		this.setState({
			score,
		});
	};

	endGame = () => {
		clearInterval(this.moveSnakeInterval);
		const { score } = this.state;
		const highScore = localStorage.getItem('highScore');
		if (score > highScore || highScore === null) {
			localStorage.setItem('highScore', score);
		}
		// eslint-disable-next-line no-alert
		alert('Game Over!');
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
				score: 0,
			},
			() => this.startGame(),
		);
	};

	render() {
		const { board, score, highScore, status } = this.state;
		return (
			<React.Fragment>
				<Header />
				<DisplayScore score={score} />
				{status ? (
					<TryAgainButton onClick={this.restart} />
				) : (
					<SnakeBoard board={board} />
				)}
				<DisplayScore highScore={highScore >= score ? highScore : score} />
			</React.Fragment>
		);
	}
}
