// export class Piece{
//     image;
//     posX;
//     posY;
//     pieceType;
//     teamType;
//     enpassant;
//     possibleMoves;

//     constructor(image, x, y, type, team){
//         this.image = image,
//         this.posX = x,
//         this.posY = y,
//         this.type = type,
//         this.team = team
//     }
// }

export class Piece{
    src;
    posX;
    posY;
    pieceType;
    teamType;
    pieceEnPassant;
    possibleMoves;
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