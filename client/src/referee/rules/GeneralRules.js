export const tileIsOccupied = (currX, currY, boardState) => {
    // console.log("checking if tile is occupied...");
    const piece = boardState.find(p=> p.posX === currX && p.posY === currY);
    if(piece){

        return true;
    }
    else{
        return false;
    }
}

export const tileIsOccupiedByOpponent = (currX, currY, boardState, team) => {
    const piece = boardState.find((p) => p.posX === currX && p.posY === currY && p.teamType != team);
    if(piece){

        return true;
    } else {
        return false;
    }
}

export const tileIsEmptyOrOccupiedByOponent = (currX, currY, boardState, team) => {
    return (
        !tileIsOccupied(currX, currY, boardState) || tileIsOccupiedByOpponent(currX, currY, boardState, team)
    );
}