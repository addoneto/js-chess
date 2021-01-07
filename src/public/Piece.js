class Piece {
    constructor(p, w = true, l){
        this.boardPos = p;
        this.white = w;
        this.dragged = false;

        this.imgPathName = l;
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

            if(board.findIndexPiece(ix, iy)) return;
            if(!this.checkMove(ix, iy)) return;
            this.boardPos[0] = ix;
            this.boardPos[1] = iy;
        }
    }
}

class Pawn extends Piece {
    constructor(p, w){
        if(w) super(p, w, 'wp');
        else super(p, w, 'bp');
    }
}

class Rook extends Piece {
    constructor(p, w){
        if(w) super(p, w, 'wr');
        else super(p, w, 'br');
    }

    checkMove(ix, iy){
        // If the piece moved both horizontal AND vertical
        if(this.boardPos[0] != ix && this.boardPos[1] != iy) return false;

        // If there is a piece on the path of the piece to the desired pos

        // Moving horizontaly
        if(this.boardPos[0] != ix){
            const squareTraversed = this.boardPos[0] - ix;
            
            for(let i = 1; i < Math.abs(squareTraversed); i ++){

                // If moving right add else subtract
                const xCheck = squareTraversed < 0 ? this.boardPos[0] + i : this.boardPos[0] - i;
                if(board.findIndexPiece(xCheck, this.boardPos[1])){
                    return false;
                }
            }
        }

        // Moving verticaly
        if(this.boardPos[1] != iy){
            const squareTraversed = this.boardPos[1] - iy;

            for(let i = 1; i < Math.abs(squareTraversed); i ++){

                // If moving up add else subtract
                const yCheck = squareTraversed < 0 ? this.boardPos[1] + i : this.boardPos[1] - i;
                if(board.findIndexPiece(this.boardPos[0], yCheck)){
                    return false;
                }
            }
        }

        return true;
    }
}

class Knight extends Piece {
    constructor(p, w){
        if(w) super(p, w, 'wkn');
        else super(p, w, 'bkn');
    }
}

class Bishop extends Piece {
    constructor(p, w){
        if(w) super(p, w, 'wb');
        else super(p, w, 'bb');
    }

    checkMove(ix, iy){
        // If not moving in a perfect diagonal
        if(Math.abs(this.boardPos[0] - ix) != Math.abs(this.boardPos[1] - iy)) return false;

        // If there is a piece on the path of the piece to the desired pos

        const squareTraversed = (Math.abs(this.boardPos[0] - ix) + Math.abs(this.boardPos[1] - iy)) / 2;

        for(let i = 1; i < squareTraversed; i++){
            // If moving Right ? sum to the x : subtract to the x
            const xCheck = this.boardPos[0] - ix < 0 ? this.boardPos[0] + i : this.boardPos[0] - i;

            // If moving Up ? sum to the y : subtract to the y
            const yCheck = this.boardPos[1] - iy < 0 ? this.boardPos[1] + i : this.boardPos[1] - i;

            if(board.findIndexPiece(xCheck, yCheck)) return false;
        }

        return true;
    }
}

class King extends Piece {
    constructor(p, w){
        if(w) super(p, w, 'wk');
        else super(p, w, 'bk');
    }
}

class Queen extends Piece {
    constructor(p, w){
        if(w) super(p, w, 'wq');
        else super(p, w, 'bq');
    }
}