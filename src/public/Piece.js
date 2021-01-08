class Piece {
    constructor(p, w, l, id){
        this.pieceBoardId = id;

        this.boardPos = p;
        this.white = w;
        this.imgPathName = l;

        this.dragged = false;
        this.hasMoved = false;
    }

    draw(tileSize){
        var pieceImg = new Image(200, 200);
        pieceImg.src = `./pieces/${this.imgPathName}.png`;

        if(this.dragged){
            ctx.drawImage(pieceImg,
                0, 0, 200, 200,
                mouseX - (tileSize/2), mouseY - (tileSize/2),
                tileSize, tileSize);

            return;
        }

        ctx.drawImage(pieceImg,
        0, 0, 200, 200,
        this.boardPos[0] * tileSize, this.boardPos[1]  * tileSize,
        tileSize, tileSize);
    }

    drag(ix, iy){
        this.dragged = !this.dragged;

        if(!this.dragged){

            if(board.findIndexPiece(ix, iy) && this.white === board.findIndexPiece(ix, iy).white) return;
            if(!this.checkMove(ix, iy)) return;
            this.boardPos[0] = ix;
            this.boardPos[1] = iy;

            this.hasMoved = true;
        }
    }

    capture(){
        console.log('Piece captured: ' + this.boardIndex);
        board.deletePiece(this.boardIndex);
        delete this;
    }
}

class Pawn extends Piece {
    constructor(p, w, i){ super(p, w, w ? 'wp' : 'bp', i); }

    // FIX movement when playing black

    checkMove(ix, iy){
        if(this.boardPos[1] - iy < 0 || this.boardPos[1] == 0) return false;

        // First moviment 
        if(!this.hasMoved){
            if(this.boardPos[1] - iy == 2){
                if(board.findIndexPiece(this.boardPos[0], this.boardPos[1] - 1)) return false
            }else if(this.boardPos[1] - iy > 2) return false;

        }else{
            if(this.boardPos[1] - iy > 1) return false;
        }

        // Capturing on diagonal
        if(Math.abs(this.boardPos[0] - ix) != 0){
            if(Math.abs(this.boardPos[0] - ix) > 1) return false;

            const findPiece = board.findIndexPiece(ix, iy);
            if(findPiece && findPiece.white != this.white){
                findPiece.capture();
                return true;
            }

            return false;
        }
        
        return true;
    }

}

class Rook extends Piece {
    constructor(p, w, i){ super(p, w, w ? 'wr' : 'br', i); }

    checkMove(ix, iy){
        // If the piece moved both horizontal AND vertical (diagonally)
        if(this.boardPos[0] != ix && this.boardPos[1] != iy) return false;

        // If there is a piece on the path of the piece to the desired pos

        // Moving horizontaly
        if(this.boardPos[0] != ix){
            const squareTraversed = this.boardPos[0] - ix;
            
            for(let i = 1; i <= Math.abs(squareTraversed); i ++){

                // If moving right add else subtract
                const xCheck = squareTraversed < 0 ? this.boardPos[0] + i : this.boardPos[0] - i;

                const findPiece = board.findIndexPiece(xCheck, this.boardPos[1]);
                if(findPiece){
                    // If the piece is the end of the path & colors are oposite
                    if(i == Math.abs(squareTraversed) && findPiece.white != this.white){
                        findPiece.capture();
                        return true;
                    }
                    return false;
                }
                
            }
        }

        // Moving verticaly
        if(this.boardPos[1] != iy){
            const squareTraversed = this.boardPos[1] - iy;

            for(let i = 1; i <= Math.abs(squareTraversed); i ++){

                // If moving up add else subtract
                const yCheck = squareTraversed < 0 ? this.boardPos[1] + i : this.boardPos[1] - i;

                const findPiece = board.findIndexPiece(this.boardPos[0], yCheck);
                if(findPiece){
                    if(i == Math.abs(squareTraversed) && findPiece.white != this.white){
                        findPiece.capture();
                        return true;
                    }
                    return false;
                }
            }
        }

        return true;
    }
}

const knightMoves = [
 [1,2], [2,1], [2,-1], [1, -2],
 [-1,2], [-2,1], [-2, -1], [-1, -2]
];

class Knight extends Piece {
    constructor(p, w, i){ super(p, w, w ? 'wkn' : 'bkn', i); }

    checkMove(ix, iy){
        const relativeBoardPos = [this.boardPos[0] - ix, this.boardPos[1] - iy];

        // 2D Array Includes
        let allowMove = false;
        for(let m of knightMoves){
            if(m[0] === relativeBoardPos[0] && m[1] === relativeBoardPos[1]){
                allowMove = true;
                break;
            }
        }

        if(allowMove){
            const findPiece = board.findIndexPiece(ix, iy);
            if(findPiece && findPiece.white != this.white) findPiece.capture()
            return true;
        }else return false;
    }
}

class Bishop extends Piece {
    constructor(p, w, i){ super(p, w, w ? 'wb' : 'bb', i); }

    checkMove(ix, iy){
        // If not moving in a perfect diagonal
        if(Math.abs(this.boardPos[0] - ix) != Math.abs(this.boardPos[1] - iy)) return false;

        // If there is a piece on the path of the piece to the desired pos

        const squareTraversed = (Math.abs(this.boardPos[0] - ix) + Math.abs(this.boardPos[1] - iy)) / 2;

        for(let i = 1; i <= squareTraversed; i++){
            // If moving Right ? sum to the x : subtract to the x
            const xCheck = this.boardPos[0] - ix < 0 ? this.boardPos[0] + i : this.boardPos[0] - i;

            // If moving Up ? sum to the y : subtract to the y
            const yCheck = this.boardPos[1] - iy < 0 ? this.boardPos[1] + i : this.boardPos[1] - i;

            const findPiece = board.findIndexPiece(xCheck, yCheck);

            if(findPiece){
                if(i == Math.abs(squareTraversed) && findPiece.white != this.white){
                    findPiece.capture();
                    return true;
                }
                return false;
            }

        }

        return true;
    }
}

class King extends Piece {
    constructor(p, w, i){ super(p, w, w ? 'wk' : 'bk', i); }

    checkMove(ix, iy){
        if(Math.board(this.boardPos[0] - ix) > 2 ||
            Math.board(this.boardPos[1] - iy) > 2){ 

            return false;
        }

        const findPiece = board.findIndexPiece(ix, iy);
        if(findPiece && findPiece.white != this.white){
            findPiece.capture();
            return true;

        }else return false;
    }
}

class Queen extends Piece {
    constructor(p, w, i){ super(p, w, w ? 'wq' : 'bq', i); }

    checkMove(ix, iy){
        if(this.boardPos[0] != ix && this.boardPos[1] == iy ||
            this.boardPos[0] == ix && this.boardPos[1] != iy){

             // Moving horizontaly
            if(this.boardPos[0] != ix){
                const squareTraversed = this.boardPos[0] - ix;
                
                for(let i = 1; i <= Math.abs(squareTraversed); i ++){

                    // If moving right add else subtract
                    const xCheck = squareTraversed < 0 ? this.boardPos[0] + i : this.boardPos[0] - i;

                    const findPiece = board.findIndexPiece(xCheck, this.boardPos[1]);
                    if(findPiece){
                        // If the piece is the end of the path & colors are oposite
                        if(i == Math.abs(squareTraversed) && findPiece.white != this.white){
                            findPiece.capture();
                            return true;
                        }
                        return false;
                    }
                    
                }
            }

            // Moving verticaly
            if(this.boardPos[1] != iy){
                const squareTraversed = this.boardPos[1] - iy;

                for(let i = 1; i <= Math.abs(squareTraversed); i ++){

                    // If moving up add else subtract
                    const yCheck = squareTraversed < 0 ? this.boardPos[1] + i : this.boardPos[1] - i;

                    const findPiece = board.findIndexPiece(this.boardPos[0], yCheck);
                    if(findPiece){
                        if(i == Math.abs(squareTraversed) && findPiece.white != this.white){
                            findPiece.capture();
                            return true;
                        }
                        return false;
                    }
                }
            }
                
        }else{

            if(Math.abs(this.boardPos[0] - ix) != Math.abs(this.boardPos[1] - iy)) return false;
            const squareTraversed = (Math.abs(this.boardPos[0] - ix) + Math.abs(this.boardPos[1] - iy)) / 2;

            for(let i = 1; i <= squareTraversed; i++){
                const xCheck = this.boardPos[0] - ix < 0 ? this.boardPos[0] + i : this.boardPos[0] - i;
                const yCheck = this.boardPos[1] - iy < 0 ? this.boardPos[1] + i : this.boardPos[1] - i;
                const findPiece = board.findIndexPiece(xCheck, yCheck);

                if(findPiece){
                    if(i == Math.abs(squareTraversed) && findPiece.white != this.white){
                        findPiece.capture();
                        return true;
                    }
                    return false;
                }

            }
        }

        return true;
    }

}