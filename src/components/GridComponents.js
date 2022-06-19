import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { useSelector, useDispatch } from "react-redux";
import { PositionTypes } from "../modal";

const GridComponent = () => {
  const data = useSelector((state) => state.keys.value);

  const column = PositionTypes[data.playerPos];

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 300,
      cellRendererParams: {
        footerValueGetter: (params) => {
          const isRootLevel = params.node.level === -1;
          if (isRootLevel) {
            return "Career Totals";
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
    <div className="ag-theme-alpine" style={{ height: 300 }}>
      <AgGridReact
        rowData={data.playerMap.get(data.playerId)["seasons"]}
        columnDefs={column}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        groupIncludeFooter={true}
        groupIncludeTotalFooter={true}
        animateRows={true}
      ></AgGridReact>
    </div>
  ) : null;
};

export default GridComponent;
