import React, { Component } from "react";
import "./App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import GridComponent from "./components/GridComponents";

import { updatePlayerId } from "./features/data";

import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

const PlayerSelect = () => {
  const data = useSelector((state) => state.keys.value);
  const dispatch = useDispatch();
  const players = Array.from(data.playerMap.values()).map((player) => ({
    value: {
      id: player.playerInfo["PlayerId"],
      pos: player.playerInfo["PositionId"],
    },
    label: `${player.playerInfo["FirstName"]} ${player.playerInfo["LastName"]}(${player.playerInfo["PositionId"]})`,
  }));

  players.unshift({
    value: {
      id: null,
      pos: null,
    },
    label: `Select ...`,
  })

  return (
    <Select
    value={data.playerIdP}
      options={players}
      onChange={(event) => {
        dispatch(
          updatePlayerId({
            playerId: event.value.id,
            playerPos: event.value.pos,
          })
        );
      }}
    />
  );
};

const PlayerInfo = () => {
  const data = useSelector((state) => state.keys.value);
  const playerInfo = data.playerId
    ? data.playerMap.get(data.playerId)["playerInfo"]
    : null;
  const heightFormat = (height) => {
    let heightToString = height.toString().slice(0, -1);
    if (heightToString.charAt(1) === "0") {
      return heightToString.replaceAt(1, `'`);
    } else {
      return heightToString.slice(0, 1) + `'` + heightToString.slice(1);
    }
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return playerInfo !== null ? (
    <List>
      <ListItem>
        <ListItemText
          primary="Name"
          secondary={`${playerInfo["FirstName"]} ${playerInfo["LastName"]}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="Age"
          secondary={`${getAge(playerInfo["DOB"])}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="School"
          secondary={`${playerInfo["SchoolName"]}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="Position"
          secondary={`${playerInfo["PositionId"]}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="Jersey No:"
          secondary={`${playerInfo["Jersey"]}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary={`Height`}
          secondary={`${heightFormat(`${playerInfo["Hgt"]}`)} ft`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary={`Weight`}
          secondary={`${playerInfo["Wgt"]} lbs`}
        />
      </ListItem>
    </List>
  ) : null;
};

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerSelect />
        <div className="flexbox">
          <PlayerInfo className="playerInfo" />
          <GridComponent />
        </div>
      </div>
    );
  }
}

export default App;
