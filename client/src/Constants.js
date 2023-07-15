// ChessBoard basically has 2 axis
// And these two axies are divided into 8 cols and rows respectively
// So this make a gird of 8X8

import { Piece } from "./models/Piece";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h",]
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export const GRID_SIZE = 90;

export class Position{
    constructor(x, y){
        this.posX = x;
        this.posY = y;
    }
}



export const initialBoardState =  [
    // ROOK
    new Piece(0, 0, "ROOK", "OUR"),
    new Piece(7, 0, "ROOK", "OUR"),

    new Piece(0, 7, "ROOK", "OPONENT"),
    new Piece(7, 7, "ROOK", "OPONENT"),
    


    // KNIGHT
    new Piece( 1, 0, "KNIGHT", "OUR"),
    new Piece( 6, 0, "KNIGHT", "OUR"),

    new Piece(1, 7, "KNIGHT", "OPONENT"),
    new Piece(6, 7, "KNIGHT", "OPONENT"),
    

    // BISHOP
    new Piece(2, 0, "BISHOP", "OUR"),
    new Piece(5, 0, "BISHOP", "OUR"),

    new Piece(2, 7, "BISHOP", "OPONENT"),
    new Piece(5, 7, "BISHOP", "OPONENT"),
    


    // QUEEN
    new Piece(3, 0, "QUEEN", "OUR"),
    new Piece(3, 7, "QUEEN", "OPONENT"),
    


    // KING
    new Piece(4, 0, "KING", "OUR"),
    new Piece(4, 7, "KING", "OPONENT"),
    
    // OUR PAWN
    new Piece(0, 1, "PAWN", "OUR"),
    new Piece(1, 1, "PAWN", "OUR"),
    new Piece(2, 1, "PAWN", "OUR"),
    new Piece(3, 1, "PAWN", "OUR"),
    new Piece(4, 1, "PAWN", "OUR"),
    new Piece(5, 1, "PAWN", "OUR"),
    new Piece(6, 1, "PAWN", "OUR"),
    new Piece(7, 1, "PAWN", "OUR"),
    
    // OPONENT PAWN
    new Piece(0, 6, "PAWN", "OPONENT"),
    new Piece(1, 6, "PAWN", "OPONENT"),
    new Piece(2, 6, "PAWN", "OPONENT"),
    new Piece(3, 6, "PAWN", "OPONENT"),
    new Piece(4, 6, "PAWN", "OPONENT"),
    new Piece(5, 6, "PAWN", "OPONENT"),
    new Piece(6, 6, "PAWN", "OPONENT"),
    new Piece(7, 6, "PAWN", "OPONENT"),
    


];