import { useEffect, useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import { initialBoardState } from "../../Constants";
import { GetPossiblePawnMoves, bishopMove, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossibleQueenMoves, getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";

export default function Referee() {
    const [pieces, setPieces] = useState(initialBoardState)
    const [promotionPawn, setPromotionPawn] = useState()
    const modalRef = useRef(null);

    useEffect(() => {
        updatePossibleMoves();
    }, [])

    // updatePossibleMoves()
    function updatePossibleMoves() {
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p, currentPieces);
                return p;
            });
        });
    }
    function playMove(playedPiece, destinationX, destinationY) {
        
        const validMode = isValidMove(playedPiece.posX, playedPiece.posY, destinationX, destinationY, playedPiece.pieceType, playedPiece.teamType);

        const enPassantMove = isEnPassantMove(playedPiece.posX, playedPiece.posY, destinationX, destinationY, playedPiece.pieceType, playedPiece.teamType);
        const pawnDirection = (playedPiece.teamType === "OUR") ? 1 : -1;
        if (enPassantMove) {
            const updatedPieces = pieces.reduce((results, piece) => {
                if (piece.posX === playedPiece.posX && piece.posY === playedPiece.posY) {
                    piece.pieceEnPassant = false;
                    piece.posX = destinationX;
                    piece.posY = destinationY;
                    results.push(piece);
                } else if (!(piece.posX === destinationX && piece.posY === destinationY - pawnDirection)) {
                    if (piece.pieceType === "PAWN") {
                        piece.pieceEnPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, []);
            updatePossibleMoves();
            setPieces(updatedPieces);
        } else if (validMode) {

            // REDUCE FUNCTION
            // results => array of results
            // piece => single object from the initial array (initial array is value): current piece that we're handling


            // updates the position of the piece once it's moved
            // and if a piece is attacked it removes it

            const updatedPieces = pieces.reduce((results, piece) => {
                if (piece.posX === playedPiece.posX && piece.posY === playedPiece.posY) {
                    // console.log(`x: ${piece.posX}, y: ${piece.posY}...same pos!!`);
                    // SPECIAL MOVE!
                    piece.pieceEnPassant = (Math.abs(playedPiece.posY - destinationY) === 2 && piece.pieceType === "PAWN") ? true : false;
                    piece.posX = destinationX;
                    piece.posY = destinationY;
                    let promotionRow = (piece.teamType === "OUR") ? 7 : 0;
                    if (destinationY === promotionRow && piece.pieceType === "PAWN") {
                        // console.log(modalRef.current);
                        modalRef.current.classList.remove("hidden");
                        setPromotionPawn(piece);
                        // console.log("This piece is up for promotion!");
                    }
                    results.push(piece);
                } else if (!(piece.posX === destinationX && piece.posY === destinationY)) {
                    if (piece.pieceType === "PAWN") {
                        piece.pieceEnPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, []);

            updatePossibleMoves();
            // console.log(updatedPieces);
            setPieces(updatedPieces);

        } else {
            // updatePossibleMoves();
            return false;
        }
        return true;
    }

    function isEnPassantMove(prevX, prevY, currX, currY, type, team) {
        const pawnDirection = (team === "OUR") ? 1 : -1;

        if (type === "PAWN") {
            if ((currX - prevX === -1 || currX - prevY === 1) && currY - prevY === pawnDirection) {
                // Attack in upper of bottom left corner
                // console.log("upper/bottom left");

                // Attack in upper of bottom right corner
                const piece = pieces.find(
                    (p) => p.posX === currX && p.posY === currY - pawnDirection && p.pieceEnPassant
                );
                // console.log(piece);
                if (piece) {

                    return true;
                }

            }
        }

        // if the attacking piece is pawn
        // upper left/upper right || bottom left/bottom right
        // if a piece is under or above the attacked tile
        // if the attacked piece has made an enpassant move in the previous turn
        return false;
    }

    function isValidMove(prevX, prevY, currX, currY, type, team) {

        let validMove = false;

        switch (type) {
            case "PAWN":
                console.log("PAWN");
                validMove = pawnMove(prevX, prevY, currX, currY, team, pieces);
                break;
            case "KNIGHT":
                console.log("KNIGHT");
                validMove = knightMove(prevX, prevY, currX, currY, team, pieces);
                break;
            case "BISHOP":
                console.log("BISHOP");
                validMove = bishopMove(prevX, prevY, currX, currY, team, pieces);
                break;
            case "ROOK":
                console.log("ROOK");
                validMove = rookMove(prevX, prevY, currX, currY, team, pieces);
                break;
            case "QUEEN":
                console.log("QUEEN");
                validMove = queenMove(prevX, prevY, currX, currY, team, pieces);
                break;
            case "KING":
                console.log("KING");
                validMove = kingMove(prevX, prevY, currX, currY, team, pieces);
                break;
        }

        return validMove;
    }

    function getValidMoves(piece, boardState) {
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

    function promotePawn(type) {
        // console.log(`Promoting pawn into: ${type}`);
        console.log(promotionPawn);
        if (promotionPawn === undefined) {
            return;
        }
        const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.posX === promotionPawn.posX && piece.posY === promotionPawn.posY) {
                piece.pieceType = type;
                const team = (piece.teamType === "OUR") ? "l" : "d";
                let pieceImage = "";
                switch (type) {
                    case "ROOK":
                        pieceImage = "r";
                        break;
                    case "KNIGHT":
                        pieceImage = "n";
                        break;
                    case "BISHOP":
                        pieceImage = "b";
                        break;
                    case "QUEEN":
                        pieceImage = "q";
                        break;
                }
                piece.src = `/assets/Chess_${pieceImage}${team}t45.svg`;
            }
            results.push(piece);
            return results;
        }, [])
        setPieces(updatedPieces);
        modalRef.current.classList.add("hidden")
    }
    function promotionTeamType() {
        return (promotionPawn?.teamType === "OUR") ? "l" : "d";
    }

    return (
        <>
            <div className=' absolute top-0 bottom-0 right-0 left-0 hidden' ref={modalRef}>
                <div className=' absolute flex items-center justify-around  w-[720px] h-[300px] bg-black/[0.4]  top-[240px] left-[25%]'>
                    <img onClick={() => promotePawn("ROOK")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_r${promotionTeamType()}t45.svg`} />
                    <img onClick={() => promotePawn("KNIGHT")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_n${promotionTeamType()}t45.svg`} />
                    <img onClick={() => promotePawn("BISHOP")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_b${promotionTeamType()}t45.svg`} />
                    <img onClick={() => promotePawn("QUEEN")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_q${promotionTeamType()}t45.svg`} />
                </div>
            </div>
            <Chessboard
                playMove={playMove}
                pieces={pieces}
            />
        </>
    )
}