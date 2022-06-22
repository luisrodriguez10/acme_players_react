import React from "react";
import ReactDOM from "react-dom";
import { fetchPlayers } from "./api";
import Players from "./Players";
import Player from "./Player";
import axios from "axios";
import {deletePlayer} from './api'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      playerId: "",
    };
    this.deleteAPlayer = this.deleteAPlayer.bind(this);
  }

  async componentDidMount() {
    let players = await fetchPlayers();
    this.setState({ players });
    window.addEventListener("hashchange", () => {
      this.setState({ playerId: window.location.hash.slice(1) });
    });
    this.setState({ playerId: window.location.hash.slice(1) });
    document.querySelector("form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const firstName = document.querySelector("#firstName").value;
      const lastName = document.querySelector("#lastName").value;
      const bio = document.querySelector("#bio").value;

      const player = (
        await axios.post("/api/players", { firstName, lastName, bio })
      ).data;
      players = [...this.state.players, player];
      this.setState({ players });

      document.querySelector("#firstName").value = '';
      document.querySelector("#lastName").value = '';
      document.querySelector("#bio").value = '';

    });
  }

  async deleteAPlayer(player){
    await deletePlayer(player)

    const players = this.state.players.filter(_player => _player.id !== player.id)
    this.setState({players, playerId: ''});

  }

  render() {
    const { players, playerId } = this.state;
    const {deleteAPlayer} = this;
    return (
      <div>
        <h1>Acme Players</h1>
        <main>
          <section>
            <h2>Players</h2>
            <Players players={players} playerId={playerId} deleteAPlayer={deleteAPlayer}/>
          </section>
          <section>
            <h2>Bio</h2>
            {!!playerId && <Player playerId={playerId} />}
          </section>
          <section>
            <h2>Add Player</h2>
            <form>
              <input
                id="firstName"
                placeholder="First Name"
                name="firstName"
                type="text"
              ></input>
              <input
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                type="text"
              ></input>
              <textarea id="bio" placeholder="Bio" name="bio"></textarea>
              <button>Create</button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
