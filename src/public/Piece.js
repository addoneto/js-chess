class Piece{
    constructor(p, w){
        this.imagePath = p;
        this.white = w;

        this.lastPos = [];
        this.hasMoved = false;
    }

    setLastPos(ar){
        this.lastPos = ar;
    }
}

class Pawn extends Piece{
    constructor(white = true){ super(white ? 'wp' : 'bp', white); }

    posibleMoves(posX, posY){
        let moves = [];

        let dir = this.white ? 1 : -1;

        // WHITE 
        if(board.piecesMatrix[posY - 1 * dir]){
            if(!board.piecesMatrix[posY - 1 * dir][posX]){
                moves.push([posX, posY - 1 * dir]);
            }
            if(board.piecesMatrix[posY - 1 * dir][posX + 1] && board.piecesMatrix[posY - 1 * dir][posX + 1].white != this.white){
                moves.push([posX + 1, posY - 1 * dir]);
            }
            if(board.piecesMatrix[posY - 1 * dir][posX - 1] && board.piecesMatrix[posY - 1 * dir][posX - 1].white != this.white){
                moves.push([posX - 1, posY - 1 * dir]);
            }
        }
        if(!this.hasMoved && board.piecesMatrix[posY - 2 * dir] && !board.piecesMatrix[posY - 2 * dir][posX]){
            moves.push([posX, posY - 2 * dir]);
        }

        return moves;
    }
}

class Rook extends Piece{
    constructor(white = true){ super(white ? 'wr' : 'br', white); }

    posibleMoves(posX, posY){
        let moves = [];

        // Check right
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY][posX + i]){
                if(board.piecesMatrix[posY][posX  + i].white != this.white){
                    moves.push([posX  + i, posY]);
                }
                break;
            }else{
                moves.push([posX  + i, posY]);
            }
        }

        // Check left
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY][posX - i]){
                if(board.piecesMatrix[posY][posX  - i].white != this.white){
                    moves.push([posX  - i, posY]);
                }
                break;
            }else{
                moves.push([posX  - i, posY]);
            }
        }

        // Check up
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY - i]){
                if(board.piecesMatrix[posY - i][posX]){
                    if(board.piecesMatrix[posY - i][posX].white != this.white){
                        moves.push([posX, posY - i]);
                    }
                    break;
                }else{
                    moves.push([posX, posY - i]);
                }
            }else{
                break;
            } 
        }

        // Check down
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY + i]){
                if(board.piecesMatrix[posY + i][posX]){
                    if(board.piecesMatrix[posY + i][posX].white != this.white){
                        moves.push([posX, posY + i]);
                    }
                    break;
                }else{
                    moves.push([posX, posY + i]);
                }
            }else{
                break;
            } 
        }

        return moves;
    }
}

class Bishop extends Piece{
    constructor(white = true){ super(white ? 'wb' : 'bb', white); }

    posibleMoves(posX, posY){
        let moves = [];

        // Diagonal Up Right
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY - i]){
                if(board.piecesMatrix[posY - i][posX + i]){
                    if(board.piecesMatrix[posY - i][posX + i].white != this.white){
                        moves.push([posX + i, posY - i]);
                    }
                    break;
                }else{
                    moves.push([posX + i, posY - i]);
                }
            }
        }

        // Diagonal Up Left
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY - i]){
                if(board.piecesMatrix[posY - i][posX - i]){
                    if(board.piecesMatrix[posY - i][posX - i].white != this.white){
                        moves.push([posX - i, posY - i]);
                    }
                    break;
                }else{
                    moves.push([posX - i, posY - i]);
                }
            }
        }

        // Diagonal Down Right
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY + i]){
                if(board.piecesMatrix[posY + i][posX + i]){
                    if(board.piecesMatrix[posY + i][posX + i].white != this.white){
                        moves.push([posX + i, posY + i]);
                    }
                    break;
                }else{
                    moves.push([posX + i, posY + i]);
                }
            }
        }

        // Diagonal Down Left
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY + i]){
                if(board.piecesMatrix[posY + i][posX - i]){
                    if(board.piecesMatrix[posY + i][posX - i].white != this.white){
                        moves.push([posX - i, posY + i]);
                    }
                    break;
                }else{
                    moves.push([posX - i, posY + i]);
                }
            }
        }

        return moves;
    }
}

class King extends Piece{
    constructor(white = true){ super(white ? 'wk' : 'bk', white); }

    posibleMoves(posX, posY){
        let moves = [];

        for(let y = -1; y <= 1; y++){
            for(let x = -1; x <= 1; x++){
                if(!(x === 0 && y === 0)){
                    if(board.piecesMatrix[posY + y]){
                        if(board.piecesMatrix[posY + y][posX + x]){
                            if(board.piecesMatrix[posY + y][posX + x].white != this.white){
                                moves.push([posX + x, posY + y]);
                            }
                        }else{
                            moves.push([posX + x, posY + y]);
                        }
                    }else{ break; }
                }
            }
        }

        return moves;
    }
}

const knightMoves = [
    [1,2], [2,1], [2,-1], [1, -2], [-1,2], [-2,1], [-2, -1], [-1, -2]
];

class Knight extends Piece{
    constructor(white = true){ super(white ? 'wkn' : 'bkn', white); }

    posibleMoves(posX, posY){
        let moves = [];

        for(let pmove of knightMoves){
            if(board.piecesMatrix[posY + pmove[1]]){
                if(board.piecesMatrix[posY + pmove[1]][posX + pmove[0]]){
                    if(board.piecesMatrix[posY + pmove[1]][posX + pmove[0]].white != this.white){
                        moves.push([posX + pmove[0], posY + pmove[1]]);
                    }
                }else{
                    moves.push([posX + pmove[0], posY + pmove[1]]);
                }
            }
        }

        return moves;
    }
}

class Queen extends Piece{
    constructor(white = true){ super(white ? 'wq' : 'bq', white); }

    posibleMoves(posX, posY){
        let moves = [];

        // Horizontal & Vertical (Rook)

        // Check right
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY][posX + i]){
                if(board.piecesMatrix[posY][posX  + i].white != this.white){
                    moves.push([posX  + i, posY]);
                }
                break;
            }else{
                moves.push([posX  + i, posY]);
            }
        }

        // Check left
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY][posX - i]){
                if(board.piecesMatrix[posY][posX  - i].white != this.white){
                    moves.push([posX  - i, posY]);
                }
                break;
            }else{
                moves.push([posX  - i, posY]);
            }
        }

        // Check up
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY - i]){
                if(board.piecesMatrix[posY - i][posX]){
                    if(board.piecesMatrix[posY - i][posX].white != this.white){
                        moves.push([posX, posY - i]);
                    }
                    break;
                }else{
                    moves.push([posX, posY - i]);
                }
            }else{
                break;
            } 
        }

        // Check down
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY + i]){
                if(board.piecesMatrix[posY + i][posX]){
                    if(board.piecesMatrix[posY + i][posX].white != this.white){
                        moves.push([posX, posY + i]);
                    }
                    break;
                }else{
                    moves.push([posX, posY + i]);
                }
            }else{
                break;
            } 
        }

        // Diagonals (Bishop)

        // Diagonal Up Right
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY - i]){
                if(board.piecesMatrix[posY - i][posX + i]){
                    if(board.piecesMatrix[posY - i][posX + i].white != this.white){
                        moves.push([posX + i, posY - i]);
                    }
                    break;
                }else{
                    moves.push([posX + i, posY - i]);
                }
            }
        }

        // Diagonal Up Left
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY - i]){
                if(board.piecesMatrix[posY - i][posX - i]){
                    if(board.piecesMatrix[posY - i][posX - i].white != this.white){
                        moves.push([posX - i, posY - i]);
                    }
                    break;
                }else{
                    moves.push([posX - i, posY - i]);
                }
            }
        }

        // Diagonal Down Right
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY + i]){
                if(board.piecesMatrix[posY + i][posX + i]){
                    if(board.piecesMatrix[posY + i][posX + i].white != this.white){
                        moves.push([posX + i, posY + i]);
                    }
                    break;
                }else{
                    moves.push([posX + i, posY + i]);
                }
            }
        }

        // Diagonal Down Left
        for(let i = 1; i <= 7; i++){
            if(board.piecesMatrix[posY + i]){
                if(board.piecesMatrix[posY + i][posX - i]){
                    if(board.piecesMatrix[posY + i][posX - i].white != this.white){
                        moves.push([posX - i, posY + i]);
                    }
                    break;
                }else{
                    moves.push([posX - i, posY + i]);
                }
            }
        }

        return moves;
    }
}