import { Position } from "../../models/Position";
import { tileIsEmptyOrOccupiedByOponent, tileIsOccupied } from "./GeneralRules";

export const kingMove = (prevX, prevY, currX, currY, team, boardState) => {
    // DIAGONAL / VERTIAL / HORIZONTAL
    console.log("KING Movement!");

    let multiplyerX = (currX < prevX) ? -1 : (currX > prevX) ? 1 : 0;
    let multiplyerY = (currY < prevY) ? -1 : (currY > prevY) ? 1 : 0;

    let passedX = prevX + (1*multiplyerX);
    let passedY = prevY + (1*multiplyerY);
    // iff the tile is destination
    if(passedX === currX && passedY === currY){
        if(tileIsEmptyOrOccupiedByOponent(passedX, passedY, boardState, team)){
            return true;
        }
    } else { // dealing with the passing tile
        if(tileIsOccupied(passedX, passedY, boardState)){
            console.log("illegal move!!");
            return false;
        }
    }

    return false;
}

export const getPossibleKingMoves = (king, boardState) => {
    let possibleMoves = [];

    // TOP-RIGHT
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX + i, king.posY + i);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX + i, king.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX + i, king.posY + i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // TOP-LEFT
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX - i, king.posY + i);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX - i, king.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX - i, king.posY + i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-RIGHT
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX + i, king.posY - i);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX + i, king.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX + i, king.posY - i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-LEFT
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX - i, king.posY - i);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX - i, king.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX - i, king.posY - i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // UP
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX, king.posY + i);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX, king.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX, king.posY + i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // DOWN
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX, king.posY - i);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX, king.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX, king.posY - i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // RIGHT
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX + i, king.posY);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX + i, king.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX + i, king.posY, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // LEFT
    for(let i = 1; i<2; i++){
        const destination = new Position(king.posX - i, king.posY);
        // if the move is outside the board we can't add it;
        if(destination.posX < 0 || destination.posX > 7 || destination.posY < 0 || destination.posY > 7){
            break;
        }
        if(!tileIsOccupied(king.posX - i, king.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX - i, king.posY, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves
}

// In this method the enemy moves have already been calculated
export const getCastlingMoves = (king, boardState) => {
    const possibleMoves = [];

    if(king.hasMoved) return possibleMoves;
    
    // Get the rooks from the king team which have not moved yet
    const rooks = boardState.filter(p => p.isRook && p.teamType === king.teamType && !p.hasMoved);

    // Loop through the rooks possible move
    for(const rook of rooks){
        // Determine if we want to go to right or left side
        const direction = (rook.posX - king.posX > 0) ? 1 : -1;


        
        // You might have to change this const to let
        // const adjacentPositionX = king.posX;
        let adjacentPositionX = king.posX; 
        const adjacentPositionY = king.posY;

        adjacentPositionX += direction;

        if(!rook.possibleMoves?.some(m => m.posX === adjacentPositionX && m.posY === adjacentPositionY)) continue;

        // Now we know the rook can move to the adjacent side of the king

        const concerningTiles = rook.possibleMoves.filter(m => m.posY === king.posY);

        // checking if any of the enemy pieces can attack the spaces b/w
        // king and rook
        const enemyPieces = boardState.filter(p => p.teamType !== king.teamType)
        let valid = true;
        
        for(const enemy of enemyPieces){
            if(enemy.possibleMoves === undefined) continue;

            for(const move of enemy.possibleMoves){
                if(concerningTiles.some(t => t.posX === move.posX && t.posY === move.posY)){
                    valid = false;
                }
                if(!valid){
                    break;
                }
            }
            if(!valid){
                break;
            }
        }

        // if(enemyPieces.some(p => p.possibleMoves?.some(m => concerningTiles.some(t => t.posX === m.posX && t.posY === m.posY)))) continue;
        if(!valid) continue;

        // Now add it as possible move
        // possibleMoves.push({posX: rook.posX, posY: rook.posY});
        possibleMoves.push(new Position(rook.posX, rook.posY));
    }
    

    return possibleMoves;
}