import React from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonButton,
  IonLabel,
} from "@ionic/react";

class PlayerButtons extends React.Component {
  constructor(props) {
    super(props);
    this.playerSelected = this.playerSelected.bind(this);
  }

  playerSelected(player,positionId){
    this.props.updatePlayerID(player,positionId)
    this.props.updateSeasonID(null);
  }
  render() {
    return Array.from(this.props.players).map((player, index) => {
      return (
        <IonCol key={index}>
          <IonButton onClick={ () => {this.playerSelected(player.playerInfo['PlayerId'],player.playerInfo['PositionId'])}}>{`${player.playerInfo['FirstName'] } ${player.playerInfo['LastName'] }`}</IonButton>
        </IonCol>
      );
    });
  }
}

export default PlayerButtons;
