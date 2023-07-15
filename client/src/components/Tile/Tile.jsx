import React from 'react'
import "./Tile.css"

const Tile = ({image, number, highlight}) => {

    const className = [
        "tile",
        number%2 === 0 && "green-tile",
        number%2 !== 0 && "white-tile",
        highlight && "tile-highlight",
        image && "chess-piece-tile"
    ].filter(Boolean).join(' ');

    // By observing the chess board we get that we want a white tile when number is odd
    // and a green tile when number is even


    return (
        <div className={className}>
            {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece w-[90px] h-[90px] bg-no-repeat bg-contain hover:cursor-grab active:cursor-grabbing'></div>}
            {/* <img src={image} /> */}
        </div>
    )



    // if(number%2  === 0){
    //     return (
    //         <div className=" tile green-tile">
    //             {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece w-[90px] h-[90px] bg-no-repeat bg-contain hover:cursor-grab active:cursor-grabbing'></div>}
    //             {/* <img src={image} /> */}
    //         </div>
    //     )
    // }
    // else{
    //     return (
    //         <div className=' tile white-tile'>
    //             {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece w-[90px] h-[90px] bg-no-repeat bg-contain hover:cursor-grab active:cursor-grabbing'></div>}
    //             {/* <img src={image} /> */}
    //         </div>
    //     )
    // }
  
}

export default Tile