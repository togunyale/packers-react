import React from "react";
import * as columnDefs from "../modal";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GameStats extends React.Component {
  constructor(props) {
    super(props);
    this.gameByGameCol = this.getGameByGameColumnDefs();
    this.seasonTotalCol = this.getSeasonColumnDefs();

    this.state = {
      seasonResults: this.getSeasonTotals(),
    };
  }

  getSeasonTotals() {
    return [
      this.props.gameByGameMap.reduce((accum, game) => {
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
      }, {}),
    ];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.positionId !== this.props.positionId) {
      this.gameByGameCol = this.getColumnDefs();
      this.seasonTotalCol = this.getSeasonColumnDefs();
    }
    if (this.props.seasonId !== prevProps.seasonId) {
      this.setState({
        seasonResults: this.getSeasonTotals(),
      });
    }
  }

  getGameByGameColumnDefs() {
    if (this.props.positionId === "QB") {
      return columnDefs.qbStatCol_GameByGame;
    } else if (this.props.positionId === "RB") {
      return columnDefs.rbStatCol_GameByGame;
    } else {
      return columnDefs.wrStatCol_GameByGame;
    }
  }

  getSeasonColumnDefs() {
    if (this.props.positionId === "QB") {
      return columnDefs.qbStatCol_Season;
    } else if (this.props.positionId === "RB") {
      return columnDefs.rbStatCol_Season;
    } else {
      return columnDefs.wrStatCol_Season;
    }
  }

  render() {
    return (
      <IonCol>
        <IonRow>
          <IonLabel>Season Totals </IonLabel>
        </IonRow>
        <div className="ag-theme-alpine" style={{ height: 100 }}>
          <AgGridReact
            rowData={this.state.seasonResults}
            columnDefs={this.seasonTotalCol}
          ></AgGridReact>
        </div>
        <IonRow>
          <IonLabel>Game By Game </IonLabel>
        </IonRow>
        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact
            rowData={this.props.gameByGameMap}
            columnDefs={this.gameByGameCol}
          ></AgGridReact>
        </div>
      </IonCol>
    );
  }
}

export default GameStats;
