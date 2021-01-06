const canvas = document.getElementsByTagName('canvas')[0],
ctx = canvas.getContext('2d'), tileColors = ['#232323', '#474743'];

window.addEventListener('load', start);
let board;

function start(){
    board = new Board();

    board.resize(window.innerWidth, window.innerHeight);
    board.addInitialPieces();

    window.addEventListener("resize", () => {
        board.resize(window.innerWidth, window.innerHeight)
    });

    update();
}

function update(){
    board.drawPieces();

    window.requestAnimationFrame(update);
}