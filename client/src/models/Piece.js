export class Piece{
    src;
    posX;
    posY;
    pieceType;
    teamType;
    // pieceEnPassant;
    possibleMoves;
    hasMoved;
    constructor(x, y, type, team, /*enPassant = false*/ hasMoved, moves = []){
        this.src = `/assets/Chess_${type}_${team}t45.svg`;
        this.posX = x;
        this.posY = y;
        this.pieceType = type;
        this.teamType = team;
        // this.pieceEnPassant = enPassant;
        this.possibleMoves = moves;
        this.hasMoved = hasMoved;
    }

    get isPawn(){
        return this.pieceType === "PAWN"
    }
    get isRook(){
        return this.pieceType === "ROOK"
    }
    get isKnight(){
        return this.pieceType === "KNIGHT"
    }
    get isBishop(){
        return this.pieceType === "BISHOP"
    }
    get isQueen(){
        return this.pieceType === "QUEEN"
    }
    get isKing(){
        return this.pieceType === "KING"
    }

    clone(){
        return new Piece(this.posX, this.posY, this.pieceType, this.teamType, this.hasMoved, this.possibleMoves?.map(m => m.clone()))
    }
}