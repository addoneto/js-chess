const canvas = document.getElementsByTagName('canvas')[0],
ctx = canvas.getContext('2d'), tileColors = ['#232323', '#474743'];

window.addEventListener('load', start);
let board, mouseX, mouseY;

function start(){
    board = new Board();

    window.addEventListener("resize", () => {
        board.resize(window.innerWidth, window.innerHeight)
    });

    update();
}

function update(){
    board.drawBoard();
    window.requestAnimationFrame(update);
}

document.onmousemove = event => {
    event = event || window.event;

    const rect = canvas.getBoundingClientRect();

    mouseX = Math.trunc(event.clientX - rect.left),
    mouseY =  Math.trunc(event.clientY - rect.top);
};

canvas.onmousedown = event => { board.selectPiece(mouseX, mouseY); }