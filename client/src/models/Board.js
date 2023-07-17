import { GetPossiblePawnMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../referee/rules";
import { Pawn } from "./Pawn";
// import { Piece } from "./Piece"
Pawn

export class Board {
    pieces;
    totalTurns;

    constructor(pieces, totalTurns) {
        this.pieces = pieces
        this.totalTurns = totalTurns;
    }

    get currentTeam() {
        return (this.totalTurns % 2 === 0) ? "OPONENT" : "OUR";
    }

    calculateAllMoves = () => {
        // calculate the moves of all pieces
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }
        

        // checking current team moves
        this.checkCurrentTeamMoves();

        // Remove possible moves for the team that's not playing
        for(const piece of this.pieces.filter(p => p.teamType !== this.currentTeam)){
            piece.possibleMoves = [];
        }

    }

    checkCurrentTeamMoves(){
        // Loop throug all current team's pieces
        for(const piece of this.pieces.filter(p => p.teamType === this.currentTeam)){
            if(piece.possibleMoves === undefined) continue;
            // Simulate all the piece moves
            for(const move of piece.possibleMoves){
                const simulatedBoard = this.clone();

                // Remove the piece at the destination location position
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !(p.posX === move.posX && p.posY === move.posY))

                // Example

                // Get piece of the cloned board
                const clonedPiece = simulatedBoard.pieces.find(p => p.posX === piece.posX && p.posY === piece.posY);
                clonedPiece.posX = move.posX;
                clonedPiece.posY = move.posY;

                // Get king of the cloned board
                const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.teamType === simulatedBoard.currentTeam)

                
                // Loop through all the enemy pieces
                // Check if the current team's king will be in danger
                for(const enemy of simulatedBoard.pieces.filter(p => p.teamType !== simulatedBoard.currentTeam)){
                    enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
                    if(enemy.isPawn){
                        if(enemy.possibleMoves.some(m => m.posX !== enemy.posX && (m.posX === clonedKing.posX && m.posY === clonedKing.posY))){
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !(m.posX === move.posX && m.posY === move.posY));
                            
                        }
                    } else {
                        if(enemy.possibleMoves.some(m => m.posX === clonedKing.posX && m.posY === clonedKing.posY)){
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !(m.posX === move.posX && m.posY === move.posY));
                            
                        }
                    }
                }
            }
        }
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

    clone() {

        return new Board(this.pieces.map(p => p.clone()), this.totalTurns);
    }
}