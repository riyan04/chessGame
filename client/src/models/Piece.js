// export class Piece{
//     image;
//     posX;
//     posY;
//     pieceType;
//     teamType;
//     enpassant;
//     possibleMoves;

//     constructor(image, position, type, team){
//         this.image = image,
//         this.posX
//         this.type = type,
//         this.team = team
//     }
// }

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