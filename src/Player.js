import React, {Component} from "react";
import axios from "axios";
import { fetchPlayer } from "./api";

class Player extends Component{

    constructor(){
        super();
        this.state = {
            player: {}
        }
    }

    async componentDidUpdate(prevProps){
        if(prevProps.playerId !== this.props.playerId){
            const player = await fetchPlayer(this.props.playerId)
            this.setState({player})
        }
    }

    async componentDidMount(){
        const player = await fetchPlayer(this.props.playerId)
        this.setState({player})
    }

    render(){
        const { player } = this.state;

        return (
            <ul>
                {player.bio}
            </ul>
        )
    }
}

export default Player;