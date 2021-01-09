class Board {
    constructor(){
        this.sideSize = 0;
        this.tileSize = 0;

        this.selectedPiece = '';
        this.currentPossibleMoves = [];

        this.piecesMatrix = [
            [new Rook(false), new Knight(false), new Bishop(false), new Queen(false), new King(false), new Bishop(false), new Knight(false), new Rook(false)],
            [new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false)],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            [new Pawn(), new Pawn(), new Pawn(), new Pawn(), new Pawn(), new Pawn(), new Pawn(), new Pawn()],
            [new Rook(), new Knight(), new Bishop(), new Queen(), new King(), new Bishop(), new Knight(), new Rook()],
        ];

        this.resize(window.innerWidth, window.innerHeight);
        this.drawBoard();
    }

    resize(wx, wy){
        let maxSide = wy > wx ? wx : wy;
        let side = maxSide - maxSide / 4;

        this.sideSize = side;
        this.tileSize = side / 8;

        canvas.width = side;
        canvas.height = side;
    }

    drawBoard(){
        for(let x = 0; x < 8; x++){
            for(let y = 0; y < 8; y++){
                ctx.fillStyle = (x + y) % 2 ? tileColors[0] : tileColors[1];
                ctx.fillRect(x * this.tileSize, y * this.tileSize,
                            this.tileSize, this.tileSize);

                if(this.piecesMatrix[y][x]){
                    const pieceImg = new Image(200, 200);
                    pieceImg.src = `./pieces/${this.piecesMatrix[y][x].imagePath}.png`;
            
                    ctx.drawImage(pieceImg, 0, 0, 200, 200,
                    x * this.tileSize, y  * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }

        this.drawPossibleMoves();
        this.drawSelectedPiece();
    }

    drawSelectedPiece(){
        if(!this.selectedPiece) return;

        const pieceImg = new Image(200, 200);
        pieceImg.src = `./pieces/${this.selectedPiece.imagePath}.png`;
            
        ctx.drawImage(pieceImg, 0, 0, 200, 200,
        mouseX - this.tileSize / 2, mouseY - this.tileSize / 2,
        this.tileSize, this.tileSize);
    }

    drawPossibleMoves(){
        for(let pos of this.currentPossibleMoves){
            ctx.beginPath();
            ctx.arc(pos[0] * this.tileSize + this.tileSize / 2,
                    pos[1] * this.tileSize + this.tileSize / 2,
                    this.tileSize / 5, 0, 
                    2 * Math.PI);
            ctx.fillStyle = 'rgb(35, 150, 80, 0.5)';
            ctx.fill();
        }
    }

    selectPiece(x,y){
        // Capture counter

        const indexX = Math.floor(x / this.tileSize),
              indexY = Math.floor(y / this.tileSize);

        if(!this.selectedPiece){
            if(this.piecesMatrix[indexY][indexX]){
                this.selectedPiece = this.piecesMatrix[indexY][indexX];
                this.selectedPiece.setLastPos([indexX, indexY]);

                this.piecesMatrix[indexY][indexX] = '';

                this.currentPossibleMoves = this.selectedPiece.posibleMoves(indexX, indexY);
            }
        }else{
            //  this.currentPossibleMoves.includes([indexX, indexY]
            for(let move of this.currentPossibleMoves){
                if(move[0] === indexX && move[1] === indexY){
                    this.piecesMatrix[indexY][indexX] = this.selectedPiece;
                    this.selectedPiece.hasMoved = true;
                    this.selectedPiece = '';
                    this.currentPossibleMoves = [];

                    return; 
                }
            }

            this.piecesMatrix[this.selectedPiece.lastPos[1]][this.selectedPiece.lastPos[0]] = this.selectedPiece;
            this.selectedPiece = '';
            this.currentPossibleMoves = [];
        }
    }

}