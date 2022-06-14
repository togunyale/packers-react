import React, { Component } from "react";
import yearstats from "./yearstats.json";
import playerData from "./players.json";
import SeasonButtons from "./components/SeasonButtons";
import {
  IonGrid,
  IonContent,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
} from "@ionic/react";
import PlayerButtons from "./components/PlayerButtons";
import GameStats from "./components/GameStats";
import PlayerInfo from "./components/PlayerInfo";
import Careerstats from "./components/CareerStats";

class Home extends Component {
  constructor(props) {
    super(props);
    this.playerSeasonMap = new Map();
    this.state = {
      PlayerID: null,
      PositionId: null,
      SeasonID: null,
    };
    this.populateMapFlag = false;
    if (!this.populateMapFlag) {
      this.populateMap();
      this.populateMapFlag = true;
    }

    this.updatePlayerID = this.updatePlayerID.bind(this);
    this.updateSeasonID = this.updateSeasonID.bind(this);
  }

  updatePlayerID(playerID, positionId) {
    this.setState({ PlayerID: playerID, PositionId: positionId });
  }

  updateSeasonID(seasonID) {
    this.setState({ SeasonID: seasonID });
  }

  populateMap() {
    yearstats.forEach((record) => {
      if (!this.playerSeasonMap.has(record.PlayerId)) {
        const currentPlayerData = playerData.find(
          (player) => player.PlayerId === record.PlayerId
        );
        this.playerSeasonMap.set(record.PlayerId, {
          seasons: new Map([[record.Season, [record]]]),
          playerInfo: currentPlayerData,
        });
      } else {
        const currentPlayerSeasonMap = this.playerSeasonMap.get(
          record.PlayerId
        )["seasons"];
        if (currentPlayerSeasonMap.has(record.Season)) {
          currentPlayerSeasonMap.get(record.Season).push(record);
        } else {
          currentPlayerSeasonMap.set(record.Season, [record]);
        }
      }
    });

    for (const [key, value] of this.playerSeasonMap.entries()) {
      value.career = [].concat
        .apply([], Array.from(value["seasons"].values()))
        .reduce((accum, game) => {
          Object.entries(game).forEach(([key, value]) => {
            if (!accum[key]) {
              accum[key] = parseInt(value);
            } else if (accum[key] && value) {
              accum[key] = accum[key] + parseInt(value);
            }
          });
          return {
            ...accum,
          };
        }, {});
    }
  }

  render() {
    return (
      <IonContent>
        <IonGrid>
          <IonRow>
            <PlayerButtons
              players={this.playerSeasonMap.values()}
              updatePlayerID={this.updatePlayerID}
              updateSeasonID={this.updateSeasonID}
            />
          </IonRow>
          {this.state.PlayerID !== null || 0 ? (
            <IonRow>
              <PlayerInfo
                playerInfo={
                  this.playerSeasonMap.get(this.state.PlayerID)["playerInfo"]
                }
              />
            </IonRow>
          ) : null}
          {this.state.PlayerID !== null || 0 ? (
            <IonRow>
              <IonGrid>
                <IonCol>
                  <IonRow>
                    <IonLabel>Career Stats</IonLabel>
                  </IonRow>

                  <Careerstats
                    positionId={this.state.PositionId}
                    careerStats={
                      this.playerSeasonMap.get(this.state.PlayerID)["career"]
                    }
                  />
                </IonCol>
              </IonGrid>
            </IonRow>
          ) : null}
          {this.state.PlayerID !== null || 0 ? (
            <IonRow>
              <SeasonButtons
                seasons={this.playerSeasonMap
                  .get(this.state.PlayerID)
                  ["seasons"].keys()}
                updateSeasonID={this.updateSeasonID}
              />
            </IonRow>
          ) : null}
          {this.state.PlayerID !== null &&
          this.state.SeasonID !== null &&
          this.state.PositionId !== null ? (
            <IonRow className="stat-row">
              <IonGrid>
                  <GameStats
                    gameByGameMap={this.playerSeasonMap
                      .get(this.state.PlayerID)
                      ["seasons"].get(this.state.SeasonID)}
                    positionId={this.state.PositionId}
                    seasonId={this.state.SeasonID}
                  />
              </IonGrid>
            </IonRow>
          ) : null}
        </IonGrid>
      </IonContent>
    );
  }
}

export default Home;
