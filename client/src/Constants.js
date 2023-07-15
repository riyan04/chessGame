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
    new Piece("/assets/Chess_rlt45.svg", 0, 0, "ROOK", "OUR"),
    new Piece("/assets/Chess_rlt45.svg", 7, 0, "ROOK", "OUR"),

    new Piece("/assets/Chess_rdt45.svg", 0, 7, "ROOK", "OPONENT"),
    new Piece("/assets/Chess_rdt45.svg", 7, 7, "ROOK", "OPONENT"),
    


    // KNIGHT
    new Piece("/assets/Chess_nlt45.svg", 1, 0, "KNIGHT", "OUR"),
    new Piece("/assets/Chess_nlt45.svg", 6, 0, "KNIGHT", "OUR"),

    new Piece("/assets/Chess_ndt45.svg", 1, 7, "KNIGHT", "OPONENT"),
    new Piece("/assets/Chess_ndt45.svg", 6, 7, "KNIGHT", "OPONENT"),
    

    // BISHOP
    new Piece("/assets/Chess_blt45.svg", 2, 0, "BISHOP", "OUR"),
    new Piece("/assets/Chess_blt45.svg", 5, 0, "BISHOP", "OUR"),

    new Piece("/assets/Chess_bdt45.svg", 2, 7, "BISHOP", "OPONENT"),
    new Piece("/assets/Chess_bdt45.svg", 5, 7, "BISHOP", "OPONENT"),
    


    // QUEEN
    new Piece("/assets/Chess_qlt45.svg", 3, 0, "QUEEN", "OUR"),
    new Piece("/assets/Chess_qdt45.svg", 3, 7, "QUEEN", "OPONENT"),
    


    // KING
    new Piece("/assets/Chess_klt45.svg", 4, 0, "KING", "OUR"),
    new Piece("/assets/Chess_kdt45.svg", 4, 7, "KING", "OPONENT"),
    
    // OUR PAWN
    new Piece("/assets/Chess_plt45.svg", 0, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 1, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 2, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 3, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 4, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 5, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 6, 1, "PAWN", "OUR"),
    new Piece("/assets/Chess_plt45.svg", 7, 1, "PAWN", "OUR"),
    
    // OPONENT PAWN
    new Piece("/assets/Chess_pdt45.svg", 0, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 1, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 2, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 3, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 4, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 5, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 6, 6, "PAWN", "OPONENT"),
    new Piece("/assets/Chess_pdt45.svg", 7, 6, "PAWN", "OPONENT"),
    


];