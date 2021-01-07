class Board {
    constructor(){
        this.sideSize = 0;
        this.tileSize = 0;

        this.selectedPiece = null;

        this.piecesMatrix = [];
    }

    addInitialPieces(){
        this.piecesMatrix.push( new Bishop ([0, 7], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn([5, 4], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn([3, 4], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn([2, 6], false, this.piecesMatrix.length) );
    }

    resize(wx, wy){
        let maxSide = wy > wx ? wx : wy;
        let side = maxSide - maxSide / 4;

        this.sideSize = side;
        this.tileSize = side / 8;

        canvas.width = side;
        canvas.height = side;

        //this.drawBoard();
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

    selectPiece(x, y){
        const indexX = Math.floor(x / this.tileSize),
              indexY = Math.floor(y / this.tileSize);

        if(this.selectedPiece){ 
            this.selectedPiece.drag(indexX, indexY); 
            this.selectedPiece = null;
            return;
        }

        const piece = this.findIndexPiece(indexX, indexY);
        if(piece){
            piece.drag();
            this.selectedPiece = piece;
        }
    }

    findIndexPiece(x, y){
        for(let piece of this.piecesMatrix){
            if(piece.boardPos[0] == x && piece.boardPos[1] == y){
                return piece;
            }
        }

        return false;
    }

    deletePiece(index){
        this.piecesMatrix.splice(index, 1);
    }

}