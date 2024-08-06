import { useRef, useState } from 'react'
import Tile from '../Tile/Tile'
import { verticalAxis, horizontalAxis, GRID_SIZE } from '../../Constants'




const Chessboard = ({ playMove, pieces }) => {

    const [activePiece, setActivePiece] = useState(null); // track a variable to check if some piece is actively grabbed
    
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)



    const chessBoardRef = useRef(null);
    




    // Function to grab a piece
    const grabPiece = (e) => {

        


        const element = e.target;
        // console.log(activePiece)

        const chessboard = chessBoardRef.current;
        // console.log(chessBoardRef);
        // The event is only relevent when it has a piece in it
        // So first check if the event has class "chess-piece" in it
        if (element.classList.contains("chess-piece") && chessboard) {

            // const gridX = Math.floor((e.clientX - chessboard.offsetLeft)/90);
            // const gridY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop-720)/90));
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 720) / GRID_SIZE)));

            // console.log(e);

            // make x & y variables to be assigned as absolute position
            // we are subtracting 45 because there's a ofset of 45px from top and left as the piece is centered
            const x = e.clientX - (GRID_SIZE / 2);
            const y = e.clientY - (GRID_SIZE / 2);

            console.log({x: x, y: y})

            // make the position absolute and set the position by manipulating left and top coordinates
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            // make the activePiece as the grabbed element
            setActivePiece(element)
        }
    }

    // Function to move the piece
    const movePiece = (e) => {

        // change the position by moving only when a piece is clicked
        // therefore we first check if there's a activePiece or not

        const chessboard = chessBoardRef.current;

        if (activePiece && chessboard) {
            // if yes the move the piece

            

            const minX = (chessboard.offsetLeft) - 20;
            const minY = (chessboard.offsetTop) - 20;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 70;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 70;

            const x = e.clientX - 45;
            const y = e.clientY - 45;

            activePiece.style.position = "absolute";

            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }


            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }
        }
    }


    // Function to drop the piece
    const dropPiece = (e) => {
        // simply make the activePiece null again

        const chessboard = chessBoardRef.current;

        // console.log(e);
        if (activePiece && chessBoardRef) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 720) / GRID_SIZE));

            // check if the move is valid
            

            
            const currentPiece = pieces.find(p => p.posX === gridX && p.posY === gridY);

            if (currentPiece) {

                var success = playMove(currentPiece.clone(), x, y);
                if (!success) {
                    activePiece.style.position = "relative";
                    activePiece.style.removeProperty("top");
                    activePiece.style.removeProperty("left");
                }
            }
            setActivePiece(null);
        }
    }

    // To make 8X8 grid on the chess board with alternating white and green color
    // we need to first mark a grid with specific index
    // chess already has a naming convention (ID) for each and every box
    // to spread this naming properly we make a 2D array of board
    // which marks every box ID



    

    

    const board = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            // By observing the chess board we get that we want a white tile when i+j is odd
            // and a green tile when i+j is even
            const num = j + i;

            const piece = pieces.find(p => p.posX === i && p.posY === j);
            // let image = undefined;
            let image = piece ? piece.src : undefined;

            let currentPiece = activePiece !== null ? pieces.find(p => p.posX === gridX && p.posY === gridY) : undefined;
            let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => p.posX === i && p.posY === j) : false;

            board.push(<Tile key={`${j},${i}`} image={image} number={num} highlight={highlight} />) // Passing num as props
        }
    }
    return (
        <>
            
            <div
                onMouseDown={e => grabPiece(e)} // Required to grab the piece
                onMouseMove={e => movePiece(e)} // Required to move the piece around the board
                onMouseUp={e => dropPiece(e)} // Required to drop the piece
                className=' grid grid-cols-8 bg-[#8a8a8a] w-[720px] h-[720px]'
                ref={chessBoardRef}
            >
                {board}
            </div>
        </>
    )
}



export default Chessboard