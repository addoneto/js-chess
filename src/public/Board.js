class Board {
    constructor(){
        this.sideSize = 0;
        this.tileSize = 0;

        this.selectedPiece = null;

        this.piecesMatrix = [];

        this.resize(window.innerWidth, window.innerHeight);
        this.setupBoard();
    }

    setupBoard(){
        //  WHITE

        this.piecesMatrix.push( new Rook  ([0, 7], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Rook  ([7, 7], true, this.piecesMatrix.length) );

        this.piecesMatrix.push( new Knight([1, 7], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Knight([6, 7], true, this.piecesMatrix.length) );

        this.piecesMatrix.push( new Bishop([2, 7], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Bishop([5, 7], true, this.piecesMatrix.length) );

        this.piecesMatrix.push( new King  ([4, 7], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Queen ([3, 7], true, this.piecesMatrix.length) );

        this.piecesMatrix.push( new Pawn  ([0, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([1, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([2, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([3, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([4, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([5, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([6, 6], true, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([7, 6], true, this.piecesMatrix.length) );

        //  BLACK

        this.piecesMatrix.push( new Rook  ([0, 0], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Rook  ([7, 0], false, this.piecesMatrix.length) );

        this.piecesMatrix.push( new Knight([1, 0], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Knight([6, 0], false, this.piecesMatrix.length) );

        this.piecesMatrix.push( new Bishop([2, 0], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Bishop([5, 0], false, this.piecesMatrix.length) );

        this.piecesMatrix.push( new King  ([4, 0], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Queen ([3, 0], false, this.piecesMatrix.length) );

        this.piecesMatrix.push( new Pawn  ([0, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([1, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([2, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([3, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([4, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([5, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([6, 1], false, this.piecesMatrix.length) );
        this.piecesMatrix.push( new Pawn  ([7, 1], false, this.piecesMatrix.length) );
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

                ctx.fillStyle = (i + j) % 2 ? tileColors[0] : tileColors[1];

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
            // Drop piece 
            this.selectedPiece.drag(indexX, indexY); 
            this.selectedPiece = null;
            return;
        }

        const piece = this.findIndexPiece(indexX, indexY);
        if(piece && !this.selectedPiece){
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

    deletePiece(i){
        const idPieceIndex = this.piecesMatrix.findIndex(x => x.pieceBoardId === i);
        this.piecesMatrix.splice(idPieceIndex, 1);
    }

}