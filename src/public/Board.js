class Board {
    constructor(){
        this.sideSize = 0;
        this.tileSize = 0;

        this.piecesMatrix = [];
    }

    addInitialPieces(){
        //  WHITE

        this.piecesMatrix.push( new Rook([0, 7], true) );
        this.piecesMatrix.push( new Rook([7, 7], true) );

        this.piecesMatrix.push( new Knight([1, 7], true) );
        this.piecesMatrix.push( new Knight([6, 7], true) );

        this.piecesMatrix.push( new Bishop([2, 7], true) );
        this.piecesMatrix.push( new Bishop([5, 7], true) );

        this.piecesMatrix.push( new King([4, 7], true) );
        this.piecesMatrix.push( new Queen([3, 7], true) );

        this.piecesMatrix.push( new Pawn([0, 6], true) );
        this.piecesMatrix.push( new Pawn([1, 6], true) );
        this.piecesMatrix.push( new Pawn([2, 6], true) );
        this.piecesMatrix.push( new Pawn([3, 6], true) );
        this.piecesMatrix.push( new Pawn([4, 6], true) );
        this.piecesMatrix.push( new Pawn([5, 6], true) );
        this.piecesMatrix.push( new Pawn([6, 6], true) );
        this.piecesMatrix.push( new Pawn([7, 6], true) );

        //  BLACK

        this.piecesMatrix.push( new Rook([0, 0], false) );
        this.piecesMatrix.push( new Rook([7, 0], false) );

        this.piecesMatrix.push( new Knight([1, 0], false) );
        this.piecesMatrix.push( new Knight([6, 0], false) );

        this.piecesMatrix.push( new Bishop([2, 0], false) );
        this.piecesMatrix.push( new Bishop([5, 0], false) );

        this.piecesMatrix.push( new King([4, 0], false) );
        this.piecesMatrix.push( new Queen([3, 0], false) );

        this.piecesMatrix.push( new Pawn([0, 1], false) );
        this.piecesMatrix.push( new Pawn([1, 1], false) );
        this.piecesMatrix.push( new Pawn([2, 1], false) );
        this.piecesMatrix.push( new Pawn([3, 1], false) );
        this.piecesMatrix.push( new Pawn([4, 1], false) );
        this.piecesMatrix.push( new Pawn([5, 1], false) );
        this.piecesMatrix.push( new Pawn([6, 1], false) );
        this.piecesMatrix.push( new Pawn([7, 1], false) );

    }

    resize(wx, wy){
        let maxSide = wy > wx ? wx : wy;
        let side = maxSide - maxSide / 4;

        this.sideSize = side;
        this.tileSize = side / 8;

        canvas.width = side;
        canvas.height = side;

        this.drawBoard();
    }

    drawBoard(){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){

                const currentColor = (i + j) % 2 ? tileColors[0] : tileColors[1];
                ctx.fillStyle = currentColor;
                ctx.fillRect(i * this.tileSize, j * this.tileSize,
                            this.tileSize, this.tileSize);
            
            }
        }

        this.drawPieces();
    }

    drawPieces(){
        for(let piece of this.piecesMatrix){
            piece.draw(this.tileSize);
        }
    }

}