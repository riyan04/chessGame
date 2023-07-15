// ChessBoard basically has 2 axis
// And these two axies are divided into 8 cols and rows respectively
// So this make a gird of 8X8

// import { Piece } from "./models/Piece";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h",]
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export const GRID_SIZE = 90;

export class Position{
    constructor(x, y){
        this.posX = x;
        this.posY = y;
    }
}

export class Piece{
    constructor(Image, x, y, type, team, enPassant = false, moves = []){
        this.src = Image;
        this.posX = x;
        this.posY = y;
        this.pieceType = type;
        this.teamType = team;
        this.pieceEnPassant = enPassant;
        this.possibleMoves = moves;
    }
}


export const initialBoardState =  [
    // ROOK
    {
        src: "/assets/Chess_rlt45.svg",
        posX: 0,
        posY: 0,
        pieceType: "ROOK",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_rlt45.svg",
        posX: 7,
        posY: 0,
        pieceType: "ROOK",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_rdt45.svg",
        posX: 0,
        posY: 7,
        pieceType: "ROOK",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_rdt45.svg",
        posX: 7,
        posY: 7,
        pieceType: "ROOK",
        teamType: "OPONENT",
    },
    // KNIGHT
    {
        src: "/assets/Chess_nlt45.svg",
        posX: 1,
        posY: 0,
        pieceType: "KNIGHT",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_nlt45.svg",
        posX: 6,
        posY: 0,
        pieceType: "KNIGHT",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_ndt45.svg",
        posX: 1, // CHANGED
        posY: 7,
        pieceType: "KNIGHT",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_ndt45.svg",
        posX: 6,
        posY: 7,
        pieceType: "KNIGHT",
        teamType: "OPONENT",
    },
    // BISHOP
    {
        src: "/assets/Chess_blt45.svg",
        posX: 2,
        posY: 0,
        pieceType: "BISHOP",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_blt45.svg",
        posX: 5,
        posY: 0,
        pieceType: "BISHOP",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_bdt45.svg",
        posX: 2,
        posY: 7,
        pieceType: "BISHOP",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_bdt45.svg",
        posX: 5,
        posY: 7,
        pieceType: "BISHOP",
        teamType: "OPONENT",
    },
    // QUEEN
    {
        src: "/assets/Chess_qlt45.svg",
        posX: 3,
        posY: 0,
        pieceType: "QUEEN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_qdt45.svg",
        posX: 3,
        posY: 7,
        pieceType: "QUEEN",
        teamType: "OPONENT",
    },
    // KING
    {
        src: "/assets/Chess_klt45.svg",
        posX: 4,
        posY: 0,
        pieceType: "KING",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_kdt45.svg",
        posX: 4,
        posY: 7,
        pieceType: "KING",
        teamType: "OPONENT",
    },
    // OUR PAWN
    {
        src: "/assets/Chess_plt45.svg",
        posX: 0,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 1,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 2,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 3,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 4,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 5,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 6,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    {
        src: "/assets/Chess_plt45.svg",
        posX: 7,
        posY: 1,
        pieceType: "PAWN",
        teamType: "OUR",
    },
    // OPONENT PAWN
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 0,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 1,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 2,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 3,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 4,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 5,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 6,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },
    {
        src: "/assets/Chess_pdt45.svg",
        posX: 7,
        posY: 6,
        pieceType: "PAWN",
        teamType: "OPONENT",
    },


];