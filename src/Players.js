import React from "react";

const Players = ({players, playerId, deleteAPlayer}) =>{
    return (
        <ul>
            {players.map(player => {
                return (
                    <li className={playerId === player.id ? 'selected' : ''} key={player.id}>
                        <a href={`#${player.id}`}>
                            {player.fullName}
                        </a>
                        <button onClick={() => deleteAPlayer(player)}>Delete</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default Players;