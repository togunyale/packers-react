import React from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonButton,
  IonLabel,
} from "@ionic/react";

class SeasonButtons extends React.Component {
  constructor(props) {
    super(props);
    this.seasonSelected = this.seasonSelected.bind(this);
  }

  seasonSelected(season){
      this.props.updateSeasonID(season);
  }
  render() {
    return Array.from(this.props.seasons).map((season, index) => {
      return (
        <IonCol key={index}>
          <IonButton onClick={ () => {this.seasonSelected(season)}}>{season}</IonButton>
        </IonCol>
      );
    });
  }
}

export default SeasonButtons;
