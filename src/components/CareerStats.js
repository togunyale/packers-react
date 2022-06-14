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

class Careerstats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careerTotalCol: this.getCareerColumnDefs(),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.positionId !== this.props.positionId) {
      this.setState({
        careerTotalCol: this.getCareerColumnDefs(),
      });
    }
  }

  getCareerColumnDefs() {
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
      <div className="ag-theme-alpine" style={{ height: 100 }}>
        <AgGridReact
          rowData={[this.props.careerStats]}
          columnDefs={this.state.careerTotalCol}
        ></AgGridReact>
      </div>
    );
  }
}

export default Careerstats;
