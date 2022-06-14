import React from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonButton,
  IonLabel,
} from "@ionic/react";

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <IonCol>
          <IonRow>Pos: {this.props.playerInfo.PositionId}</IonRow>
        </IonCol>
        <IonCol>
          <IonRow>No: {this.props.playerInfo.Jersey}</IonRow>
        </IonCol>
        <IonCol>
          <IonRow>Wt: {this.props.playerInfo.Wgt}</IonRow>
        </IonCol>
        <IonCol>
          <IonRow>Ht: {this.props.playerInfo.Hgt}</IonRow>
        </IonCol>
        <IonCol size="3">
          <IonRow >
            Draft Yr: {this.props.playerInfo.DraftYear}, Rd :{" "}
            {this.props.playerInfo.DraftRound}
          </IonRow>
        </IonCol>
        <IonCol size="3">
          <IonRow>School: {this.props.playerInfo.SchoolName}</IonRow>
        </IonCol>
      </>
    );
  }
}

export default PlayerInfo;
