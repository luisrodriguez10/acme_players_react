import axios from "axios";

const fetchPlayers = async () =>{
    const response = await axios.get('/api/players');
    return response.data;
};

const fetchPlayer = async (playerId) => {
    const response = await axios.get(`/api/players/${playerId}`);
    return response.data;
}

const deletePlayer = async(player) => {
    await axios.delete(`/api/players/${player.id}`)
}

export {
    fetchPlayers,
    fetchPlayer,
    deletePlayer
}