// Import stylesheets
import "./style.css";

const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>Lotto Machine</h1>`;

class LottoBall {
    constructor(private _balNumber: number) {}

    public isNumbeGreaterThan(other: LottoBall): boolean {
        return this._balNumber > other.balNumber;
    }

    public toString(): string {
        return this._balNumber.toString();
    }

    get balNumber(): number {
        return this._balNumber;
    }
}

class LottoMachine {
    constructor(private _sphere: GlassSphere, private _scoreBoard: ScoreBoard) {}

    public executeDraw(): void {
        this._sphere.resetBalls();

        for (let i = 0; i < 6; i++) {
            let ball = this._sphere.scoopeBall();
            this._scoreBoard.placeBall(ball);
        }
        let ball = this._sphere.scoopeBall();
        this._scoreBoard.placeBonusBall(ball);

        this._scoreBoard.sortBalls();
        this._scoreBoard.printScore();
    }
}

class GlassSphere {
    private _balls: Array<LottoBall>;

    constructor(private _scoreBoard: ScoreBoard) {}

    public resetBalls(): void {
        this._balls = new Array();
        for (let i = 0; i < 45; i++) {
            this._balls.push(new LottoBall(i));
        }

        this._scoreBoard.empty();
    }

    public scoopeBall(): LottoBall {
        let index = Math.floor(Math.random() * this._balls.length);
        let scoopedBall = this._balls[index];
        this._balls.splice(index, 1);

        return scoopedBall;
    }
}

class ScoreBoard {
    private _balls: Array<LottoBall>;
    private _bonusBall: LottoBall;

    public empty() {
        this._balls = new Array();
    }

    public placeBall(ball: LottoBall): void {
        this._balls.push(ball);
    }

    public placeBonusBall(ball: LottoBall): void {
        this._bonusBall = ball;
    }

    public sortBalls(): void {
        this._balls = this._balls.sort((n1, n2) => n1.balNumber - n2.balNumber);
    }

    public printScore(): void {
        const drawnNumbersDiv: HTMLElement = document.getElementById("balls");

        drawnNumbersDiv.innerHTML = "<ul>";

        for (let ball of this._balls) {
            drawnNumbersDiv.innerHTML += "<li>" + ball.balNumber + '</li>';
        }
        drawnNumbersDiv.innerHTML += "</ul>";
    }
}

const scoreBoard = new ScoreBoard();
const sphere = new GlassSphere(scoreBoard);
const machine = new LottoMachine(sphere, scoreBoard);

const button: HTMLElement = document.getElementById("button");
button.addEventListener("click", function() {
    machine.executeDraw();
});

appDiv.innerHTML = `<h1>Lotto Machine</h1>`;

machine.executeDraw();
