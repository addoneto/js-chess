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

        ctx.drawImage(pieceImg,
        0, 0, 200, 200,
        this.boardPos[0] * tileSize, this.boardPos[1]  * tileSize,
        tileSize, tileSize);
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