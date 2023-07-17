import { Piece } from "./Piece";

export class Pawn extends Piece{
    pieceEnPassant;
    constructor(x, y, team, hasMoved, enPassant = false, moves = []){
        super(x, y, "PAWN", team, hasMoved, moves);
        this.pieceEnPassant = enPassant;
    }
    clone(){
        return new Pawn(this.posX, this.posY, this.teamType, this.hasMoved, this.pieceEnPassant, this.possibleMoves?.map(m => m.clone()));
    }
}