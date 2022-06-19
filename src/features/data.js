import yearstats from "../yearstats.json";
import playerData from "../players.json";
import { createSlice } from "@reduxjs/toolkit";
const populateMap = () => {
  let playerSeasonMap = new Map();
  yearstats.forEach((record) => {
    const playsPlayed =
      parseInt(record["PTMOffensivePlays"]) +
      parseInt(record["PTMDefensivePlays"]) +
      parseInt(record["PTMSpecialTeamPlays"]);
    if (playsPlayed === 0) return;
    Object.keys(record).forEach((key) => {
      if (isNaN(record[key])) return;
      record[key] = record[key] === null ? 0 : parseInt(record[key]);
    });
    record["Opp"] =
      record["HomeAbbr"] === record["TeamAbbr"]
        ? record["AwayAbbr"] + "(Home)"
        : record["HomeAbbr"] + "(Away)";
    record["GameDate"] = record["GameDate"].slice(0, -4);
    if (!playerSeasonMap.has(record.PlayerId)) {
      const currentPlayerData = playerData.find(
        (player) => player.PlayerId === record.PlayerId
      );
      playerSeasonMap.set(record.PlayerId, {
        seasons: [record],
        playerInfo: currentPlayerData,
      });
    } else {
      playerSeasonMap.get(record.PlayerId)["seasons"].push(record);
    }
  });

  return playerSeasonMap;
};
export const dataSlice = createSlice({
  name: "keys",
  initialState: {
    value: {
      playerId: null,
      playerPos: null,
      playerMap: populateMap(),
    },
  },
  reducers: {
    updatePlayerId: (state, action) => {
      state.value.playerId = action.payload.playerId;
      state.value.playerPos = action.payload.playerPos;
    },
    updatePlayerMap: (state, action) => {
      state.value.playerMap = action.value.playerMap;
    },
  },
});

export const { updatePlayerId } = dataSlice.actions;

export default dataSlice.reducer;
