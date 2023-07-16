
export class Position{
	posX;
	posY;
	constructor(x, y){
		this.posX = x;
		this.posY = y;
	}
	
	// samePosition(otherPosition){
	// 	return( this.x === otherPosition.x && this.y === otherPosition.y);
	// }

    clone(){
        return new Position(this.posX, this.posY);
    }
}