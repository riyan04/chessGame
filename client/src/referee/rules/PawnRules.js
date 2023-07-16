import { Position } from "../../models/Position";
import { tileIsEmptyOrOccupiedByOponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
// import { Position } from "../../Constants";

export const pawnMove = (prevX, prevY, currX, currY, team, boardState) => {
    const specialRow = (team === "OUR") ? 1 : 6;
    const pawnDirection = (team === "OUR") ? 1 : -1;

    if(prevX === currX && (prevY === specialRow && currY - prevY === 2*pawnDirection)){
        if(!tileIsOccupied(currX, currY, boardState) && !tileIsOccupied(currX, currY - pawnDirection, boardState)){
            return true;
        }
    } else if(prevX === currX && currY - prevY === pawnDirection){
        if(!tileIsOccupied(currX, currY, boardState)){
            return true;
        }
    }
        
    // Attack logic
    else if(currX - prevX === -1 && currY - prevY === pawnDirection){
        // Attack in upper of bottom left corner
        // console.log("upper/bottom left");
        if(tileIsOccupiedByOpponent(currX, currY, boardState, team)){
            return true;
        }
            
    } else if(currX - prevX === 1 && currY - prevY === pawnDirection){
        // Attack in upper of bottom right corner
        // console.log("upper/bottom right");
        if(tileIsOccupiedByOpponent(currX, currY, boardState, team)){
            return true; 
        }
    }

    return false;
}

export const GetPossiblePawnMoves = (pawn, boardState) => {
    const possibleMoves = []
    const pawnDirection = (pawn.teamType === "OUR") ? 1 : -1;
    const specialRow = (pawn.teamType === "OUR") ? 1 : 6;


    const normalMove = new Position(pawn.posX, pawn.posY + pawnDirection);
    const specialMove = new Position(pawn.posX, pawn.posY + (pawnDirection*2));
    const upperLeftAttack = new Position(pawn.posX - 1, pawn.posY + pawnDirection);
    const upperRightAttack = new Position(pawn.posX + 1, pawn.posY + pawnDirection);

    if(!tileIsOccupied(pawn.posX, pawn.posY + pawnDirection, boardState)){
        possibleMoves.push(normalMove);

        if(pawn.posY === specialRow && !tileIsOccupied(pawn.posX, pawn.posY + (pawnDirection*2), boardState)){
            possibleMoves.push(specialMove);
        }
    }

    if(tileIsOccupiedByOpponent(pawn.posX - 1, pawn.posY + pawnDirection, boardState, pawn.teamType)){
        possibleMoves.push(upperLeftAttack);
    }
    if(tileIsOccupiedByOpponent(pawn.posX + 1, pawn.posY + pawnDirection, boardState, pawn.teamType)){
        possibleMoves.push(upperRightAttack);
    }

    // if(!tileIsOccupied(pawn.posX, pawn.posY + pawnDirection, boardState)){
    //     possibleMoves.push({posX: pawn.posX, posY: pawn.posY + pawnDirection});

    //     if(pawn.posY === specialRow && !tileIsOccupied(pawn.posX, pawn.posY + (pawnDirection*2), boardState)){
    //         possibleMoves.push({posX: pawn.posX, posY: pawn.posY + (pawnDirection*2)});
    //     }
    // }
    return possibleMoves;
}