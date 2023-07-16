import { GetPossiblePawnMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../referee/rules";
import { Pawn } from "./Pawn";
// import { Piece } from "./Piece"
Pawn

export class Board {
    pieces;

    constructor(pieces) {
        this.pieces = pieces

    }

    calculateAllMoves = () => {
        // calculate the moves of all pieces
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }
        
        const king = this.pieces.find(p => p.isKing && p.teamType === "OPONENT");
        if(king?.possibleMoves === undefined) return;
        const originalKingPositionX = king.posX;
        const originalKingPositionY = king.posY;

        // simulate king moves
        for(const move of king.possibleMoves){

            king.posX = move.posX;
            king.posY = move.posY;

            let safe = true;

            // Determine if the positioin is safe
            for(const p of this.pieces){
                if(p.teamType === "OPONENT") continue;
                if(p.isPawn){
                    const possiblePawnMoves = this.getValidMoves(p, this.pieces);
                    if(possiblePawnMoves?.some(ppm => ppm.posX !== p.posX && (ppm.posX === move.posX && ppm.posY === move.posY))){
                        safe = false;
                    }
                }else if(p.possibleMoves?.some(p => p.posX === p.posX === move.posX && p.posY === move.posY)){
                    safe = false;
                }
            }

            // remove the move from possible moves
            if(!safe){
                king.possibleMoves = king.possibleMoves?.filter(m => !(m.posX === move.posX && m.posY === move.posY))
            }

        }
        king.posX = originalKingPositionX;
        king.posY = originalKingPositionY;
    }

    getValidMoves(piece, boardState) {
        switch (piece.pieceType) {
            case "PAWN":
                // return moves
                return GetPossiblePawnMoves(piece, boardState);
            case "KNIGHT":
                return getPossibleKnightMoves(piece, boardState);
            case "BISHOP":
                return getPossibleBishopMoves(piece, boardState);
            case "ROOK":
                return getPossibleRookMoves(piece, boardState);
            case "QUEEN":
                return getPossibleQueenMoves(piece, boardState);
            case "KING":
                return getPossibleKingMoves(piece, boardState);
            default:
                return [];
        }
    }

    playMove = (enPassantMove, validMode, playedPiece, destinationX, destinationY) => {
        const pawnDirection = (playedPiece.teamType === "OUR") ? 1 : -1;
        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.posX === playedPiece.posX && piece.posY === playedPiece.posY) {
                    if (piece.isPawn) {

                        piece.pieceEnPassant = false;
                    }
                    piece.posX = destinationX;
                    piece.posY = destinationY;
                    results.push(piece);
                } else if (!(piece.posX === destinationX && piece.posY === destinationY - pawnDirection)) {
                    if (piece.isPawn) {
                        piece.pieceEnPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, []);
            this.calculateAllMoves();
            // setPieces(updatedPieces);
        } else if (validMode) {

            // REDUCE FUNCTION
            // results => array of results
            // piece => single object from the initial array (initial array is value): current piece that we're handling


            // updates the position of the piece once it's moved
            // and if a piece is attacked it removes it

            this.pieces = this.pieces.reduce((results, piece) => {
                // Piece that we're playing
                if (piece.posX === playedPiece.posX && piece.posY === playedPiece.posY) {

                    

                    // SPECIAL MOVE!
                    if (piece.isPawn) {

                        piece.pieceEnPassant = (Math.abs(playedPiece.posY - destinationY) === 2 && piece.pieceType === "PAWN") ? true : false;
                    }
                    // console.log(`x: ${piece.posX}, y: ${piece.posY}...piece position before!!`);
                    // console.log(`x: ${playedPiece.posX}, y: ${playedPiece.posY}...playedPiece position before!!`);
                    piece.posX = destinationX;
                    piece.posY = destinationY;
                    // console.log(`x: ${piece.posX}, y: ${piece.posY}...piece position after!!`);
                    // console.log(`x: ${playedPiece.posX}, y: ${playedPiece.posY}...playedPiece position after!!`);

                    results.push(piece);
                } else if (!(piece.posX === destinationX && piece.posY === destinationY)) {
                    if (piece.isPawn) {
                        piece.pieceEnPassant = false;
                    }
                    results.push(piece);
                }
                // The piece at the destination location
                // Won't be pushed in the results
                return results;
            }, []);

            this.calculateAllMoves();
            // console.log(updatedPieces);

        } else {
            // updatePossibleMoves();
            return false;
        }

        return true;
    }

    clone(){

        return new Board(this.pieces.map(p => p.clone()));
    }
}