import { useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import { initialBoard } from "../../Constants";
import { bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";
import { Piece } from "../../models/Piece";
// import { Pawn } from "../../models/Pawn";

export default function Referee() {
    const [board, setBoard] = useState(initialBoard.clone())
    const [promotionPawn, setPromotionPawn] = useState()
    const modalRef = useRef(null);
    const checkmateModalRef = useRef(null);


    function playMove(playedPiece, destinationX, destinationY) {

        // If playing piece doesn't have any move
        // That simply means it's invalid so simply return false;
        if(playedPiece.possibleMoves === undefined) return false;

        // Prevents inactive piece from playing if it's not its turn
        if(playedPiece.teamType === "OUR" && board.totalTurns % 2 === 0){
            console.log("invalid turn! -- W");
            return false
        }
        if(playedPiece.teamType === "OPONENT" && board.totalTurns % 2 !== 0){
            console.log("invalid turn! -- B");
            return false;
        }

        let playedMoveIsValid = false;

        const validMode = playedPiece.possibleMoves?.some(m => m.posX === destinationX && m.posY === destinationY);

        if(!validMode) return false;

        const enPassantMove = isEnPassantMove(playedPiece.posX, playedPiece.posY, destinationX, destinationY, playedPiece.pieceType, playedPiece.teamType);

        // playMove function of the Board class modifies the board
        // therefore we need to call setBoard
        setBoard(() => {

            const clonedBoard = board.clone();

            clonedBoard.totalTurns += 1;
            // playing the move ---->>> migrate to the Board.js
            playedMoveIsValid = clonedBoard.playMove(enPassantMove, validMode, playedPiece, destinationX, destinationY)

            if(clonedBoard.winningTeam !== undefined){
                checkmateModalRef.current?.classList.remove("hidden");
            }

            // console.log(clonedBoard.pieces.filter(p => p.hasMoved).length);

            return clonedBoard;
        })

        // For Pawn Promotion in the 0th and 7th row
        let promotionRow = (playedPiece.teamType === "OUR") ? 7 : 0;
        if (destinationY === promotionRow && playedPiece.isPawn) {
            // console.log(modalRef.current);
            modalRef.current.classList.remove("hidden");
            setPromotionPawn(() => {
                const clonedPlayedPiece = playedPiece.clone();
                clonedPlayedPiece.posX = destinationX;
                clonedPlayedPiece.posY = destinationY;
                return clonedPlayedPiece
            });
            // console.log("This piece is up for promotion!");
        }


        return playedMoveIsValid;
    }

    function isEnPassantMove(prevX, prevY, currX, currY, type, team) {
        const pawnDirection = (team === "OUR") ? 1 : -1;

        if (type === "PAWN") {
            if ((currX - prevX === -1 || currX - prevY === 1) && currY - prevY === pawnDirection) {
                // Attack in upper of bottom left corner
                // console.log("upper/bottom left");

                // Attack in upper of bottom right corner
                const piece = board.pieces.find(
                    (p) => p.posX === currX && p.posY === currY - pawnDirection && p.isPawn && p.pieceEnPassant
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
                validMove = pawnMove(prevX, prevY, currX, currY, team, board.pieces);
                break;
            case "KNIGHT":
                console.log("KNIGHT");
                validMove = knightMove(prevX, prevY, currX, currY, team, board.pieces);
                break;
            case "BISHOP":
                console.log("BISHOP");
                validMove = bishopMove(prevX, prevY, currX, currY, team, board.pieces);
                break;
            case "ROOK":
                console.log("ROOK");
                validMove = rookMove(prevX, prevY, currX, currY, team, board.pieces);
                break;
            case "QUEEN":
                console.log("QUEEN");
                validMove = queenMove(prevX, prevY, currX, currY, team, board.pieces);
                break;
            case "KING":
                console.log("KING");
                validMove = kingMove(prevX, prevY, currX, currY, team, board.pieces);
                break;
        }

        return validMove;
    }


    function promotePawn(type) {
        // console.log(`Promoting pawn into: ${type}`);
        console.log(promotionPawn);
        if (promotionPawn === undefined) {
            return;
        }

        setBoard(() => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
                if (piece.posX === promotionPawn.posX && piece.posY === promotionPawn.posY) {
                    results.push(new Piece(piece.posX, piece.posY, type, piece.teamType, true));
                    
                } else {

                    results.push(piece);
                }
                return results;
            }, []);
            clonedBoard.calculateAllMoves();
            
            return clonedBoard;

        });

        // setPieces(updatedPieces);
        modalRef.current.classList.add("hidden")
    }
    function promotionTeamType() {
        return (promotionPawn?.teamType === "OUR") ? "OUR" : "OPONENT";
    }

    function restartGame(){
        checkmateModalRef.current?.classList.add("hidden");
        setBoard(initialBoard.clone());
    }

    return (
        <>
            <p className=" text-white text-center">Turn: {(board.totalTurns % 2 !== 0) ? "White" : "Black"}</p>
            <div className=' absolute top-0 bottom-0 right-0 left-0 hidden' ref={modalRef}>
                <div className=' absolute flex items-center justify-around  w-[720px] h-[300px] bg-black/[0.4]  top-[240px] left-[25%]'>
                    <img onClick={() => promotePawn("ROOK")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_ROOK_${promotionTeamType()}t45.svg`} />
                    <img onClick={() => promotePawn("KNIGHT")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_KNIGHT_${promotionTeamType()}t45.svg`} />
                    <img onClick={() => promotePawn("BISHOP")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_BISHOP_${promotionTeamType()}t45.svg`} />
                    <img onClick={() => promotePawn("QUEEN")} className=' h-[120px] rounded-lg hover:cursor-pointer hover:bg-slate-400/[0.3]' src={`/assets/Chess_QUEEN_${promotionTeamType()}t45.svg`} />
                </div>
            </div>
            <div className=' absolute top-0 bottom-0 right-0 left-0 hidden' ref={checkmateModalRef}>
                <div className=' absolute flex items-center justify-around  w-[720px] h-[300px] bg-black/[0.4]  top-[240px] left-[25%]'>
                    <div className=' flex flex-col gap-[48px]'>
                        <span className=' text-[32px] text-white'>The winning team is {board.winningTeam === "OUR" ? "White" : "Black"}!</span>
                        <button onClick={restartGame} className=' bg-[#759656] rounded-[20px] text-white text-[16px] px-[12px] py-[12px] hover:cursor-pointer hover:bg-[#d9f0c4] hover:text-black'>Play Again</button>
                    </div>
                </div>
            </div>
            <Chessboard
                playMove={playMove}
                pieces={board.pieces}
            />
        </>
    )
}