import React, {useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { useSelector} from "react-redux";
import { PositionTypes } from "../modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const GridComponent = () => {
  const data = useSelector((state) => state.keys.value);
  const column = PositionTypes[data.playerPos];
  const [gameType, setGameType] = useState("Reg");

  const GameTypeChange = (event, newGameType) => {
    setGameType(newGameType);
  };

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 300,
      cellRendererParams: {
        footerValueGetter: (params) => {
          const isRootLevel = params.node.level === -1;
          if (isRootLevel) {
            return `Career Totals`;
          }
          return `Season(${params.value}) Totals`;
        },
      },
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 250,
      sortable: true,
      resizable: true,
    };
  }, []);

  return data.playerId && column ? (
    <>
      <ToggleButtonGroup
        color="primary"
        value={gameType}
        exclusive
        aria-label="Seaon Type"
        onChange={GameTypeChange}
      >
        <ToggleButton value={"Reg"}>{"Regular Season"}</ToggleButton>
        <ToggleButton value={"Post"}>{"Post Season"}</ToggleButton>
        <ToggleButton value={"Pre"}>{"Pre Season"}</ToggleButton>
      </ToggleButtonGroup>
      <div className="ag-theme-alpine" style={{ height: 300 }}>
        <AgGridReact
          rowData={data.playerMap.get(data.playerId)["seasons"][gameType]}
          columnDefs={column}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupIncludeFooter={true}
          groupIncludeTotalFooter={true}
          animateRows={true}
        ></AgGridReact>
      </div>
    </>
  ) : null;
};

export default GridComponent;
