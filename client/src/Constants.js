// ChessBoard basically has 2 axis
// And these two axies are divided into 8 cols and rows respectively
// So this make a gird of 8X8

import { Board } from "./models/Board";
import { Pawn } from "./models/Pawn";
import { Piece } from "./models/Piece";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h",]
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export const GRID_SIZE = 90;

// export class Position{
//     constructor(x, y){
//         this.posX = x;
//         this.posY = y;
//     }
// }



export const initialBoard =  new Board([
    // ROOK
    new Piece(0, 0, "ROOK", "OUR", false),
    new Piece(7, 0, "ROOK", "OUR", false),

    new Piece(0, 7, "ROOK", "OPONENT", false),
    new Piece(7, 7, "ROOK", "OPONENT", false),
    


    // KNIGHT
    new Piece( 1, 0, "KNIGHT", "OUR", false),
    new Piece( 6, 0, "KNIGHT", "OUR", false),

    new Piece(1, 7, "KNIGHT", "OPONENT", false),
    new Piece(6, 7, "KNIGHT", "OPONENT", false),
    

    // BISHOP
    new Piece(2, 0, "BISHOP", "OUR", false),
    new Piece(5, 0, "BISHOP", "OUR", false),

    new Piece(2, 7, "BISHOP", "OPONENT", false),
    new Piece(5, 7, "BISHOP", "OPONENT", false),
    


    // QUEEN
    new Piece(3, 0, "QUEEN", "OUR", false),
    new Piece(3, 7, "QUEEN", "OPONENT", false),
    


    // KING
    new Piece(4, 0, "KING", "OUR", false),
    new Piece(4, 7, "KING", "OPONENT", false),
    
    // OUR PAWN
    new Pawn(0, 1, "OUR", false),
    new Pawn(1, 1, "OUR", false),
    new Pawn(2, 1, "OUR", false),
    new Pawn(3, 1, "OUR", false),
    new Pawn(4, 1, "OUR", false),
    new Pawn(5, 1, "OUR", false),
    new Pawn(6, 1, "OUR", false),
    new Pawn(7, 1, "OUR", false),
    
    // OPONENT PAWN
    new Pawn(0, 6, "OPONENT", false),
    new Pawn(1, 6, "OPONENT", false),
    new Pawn(2, 6, "OPONENT", false),
    new Pawn(3, 6, "OPONENT", false),
    new Pawn(4, 6, "OPONENT", false),
    new Pawn(5, 6, "OPONENT", false),
    new Pawn(6, 6, "OPONENT", false),
    new Pawn(7, 6, "OPONENT", false),
    


], 1);

initialBoard.calculateAllMoves();