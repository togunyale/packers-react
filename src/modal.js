export const qbStatCol_GameByGame = [
  {
    field: "Season",
    headerName: "Season",
    rowGroup: true,
    hide: true,
  },
  {
    field: "SeasonType",
    headerName: "Season Type",
    rowGroup: true,
    hide: true,
  },
  { field: "Opp", headerName: "Opponent" },
  { field: "GameDate", headerName: "Game Date" },
  {
    field: "QBAttempts",
    headerName: "Attempts",
    sortable: true,
    aggFunc: "sum",
  },
  {
    field: "QBCompletions",
    headerName: "Completions",
    sortable: true,
    aggFunc: "sum",
  },
  {
    field: "QBYards",
    headerName: "Passing Yards",
    sortable: true,
    aggFunc: "sum",
  },
  {
    field: "QBTouchdowns",
    headerName: "Passing TDs",
    sortable: true,
    aggFunc: "sum",
  },
  {
    field: "QBInterceptions",
    headerName: "Interceptions",
    sortable: true,
    aggFunc: "sum",
  },
  { field: "QBSacks", headerName: "Sacks", sortable: true, aggFunc: "sum" },
  {
    field: "QBSackYardage",
    headerName: "Sack Yards",
    sortable: true,
    aggFunc: "sum",
  },
  { field: "QBRating", headerName: "QBR", sortable: true, aggFunc: "sum" },
  { field: "QBFumbles", headerName: "Fumbles", sortable: true, aggFunc: "sum" },
  { field: "QBHits", headerName: "QB Hits", sortable: true, aggFunc: "sum" },
  {
    field: "RusAttempts",
    headerName: "Rusing Attempts",
    sortable: true,
    aggFunc: "sum",
  },
  {
    field: "RusYards",
    headerName: "Rushing Yards",
    sortable: true,
    aggFunc: "sum",
  },
  {
    field: "RusTouchdowns",
    headerName: "Rush TDs",
    sortable: true,
    aggFunc: "sum",
  },
];

export const wrStatCol_GameByGame = [
  {
    field: "Season",
    headerName: "Season",
    rowGroup: true,
    hide: true,
  },
  {
    field: "SeasonType",
    headerName: "Season Type",
    rowGroup: true,
    hide: true,
  },
  { field: "Opp", headerName: "Opponent" },
  { field: "GameDate", headerName: "Game Date" },
  { field: "RecReceptions", headerName: "Receptions", aggFunc: "sum" },
  { field: "RecYards", headerName: "Recieving Yards", aggFunc: "sum" },
  { field: "RecTouchdowns", headerName: "Recieving TDs", aggFunc: "sum" },
  { field: "RecPassTarget", headerName: "Targets", aggFunc: "sum" },
  { field: "RecYAC", headerName: "YAC", aggFunc: "sum" },
  { field: "RecDroppedPasses", headerName: "Droped Passes", aggFunc: "sum" },
  { field: "RecTacklesAvoided", headerName: "Tackles Avoided", aggFunc: "sum" },
  { field: "RecFumbles", headerName: "Fumbles" },
  { field: "KorNumber", hide: true, aggFunc: "sum" },
  { field: "KorYards", hide: true, aggFunc: "sum" },
  { field: "KorLong", hide: true, aggFunc: "max" },
  { field: "KorLongTDReturn", hide: true, aggFunc: "max" },
  { field: "KorTouchdowns", hide: true, aggFunc: "sum" },
  { field: "KorFumbles", hide: true, aggFunc: "sum" },
  { field: "PtrNumber", hide: true, aggFunc: "sum" },
  { field: "PtrYards", hide: true, aggFunc: "sum" },
  { field: "PtrLong", hide: true, aggFunc: "max" },
  { field: "PtrLongTDReturn", hide: true, aggFunc: "sum" },
  { field: "PtrTouchdowns", hide: true, aggFunc: "sum" },
  { field: "PtrFairCatches", hide: true, aggFunc: "sum" },
];

export const rbStatCol_GameByGame = [
  {
    field: "Season",
    headerName: "Season",
    rowGroup: true,
    hide: true,
  },
  {
    field: "SeasonType",
    headerName: "Season Type",
    rowGroup: true,
    hide: true,
  },
  { field: "Opp", headerName: "Opponent" },
  { field: "GameDate", headerName: "Game Date" },
  { field: "RusAttempts", headerName: "Rusing Attempts", aggFunc: "sum" },
  { field: "RusYards", headerName: "Rushing Yards", aggFunc: "sum" },
  { field: "RusTouchdowns", headerName: "Rush TDs", aggFunc: "sum" },
  { field: "RusYAC", headerName: "Yard After Contact", aggFunc: "sum" },
  { field: "RecReceptions", headerName: "Receptions", aggFunc: "sum" },
  { field: "RecYards", headerName: "Recieving Yards", aggFunc: "sum" },
  { field: "RecTouchdowns", headerName: "Recieving TDs", aggFunc: "sum" },
  { field: "RecPassTarget", headerName: "Targets", aggFunc: "sum" },
  { field: "RecYAC", headerName: "YAC", aggFunc: "sum" },
  { field: "RecDroppedPasses", headerName: "Droped Passes", aggFunc: "sum" },
  { field: "RecTacklesAvoided", headerName: "Tackles Avoided", aggFunc: "sum" },
  { field: "RecFumbles", headerName: "Fumbles", aggFunc: "sum" },
  { field: "KorNumber", hide: true, aggFunc: "sum" },
  { field: "KorYards", hide: true, aggFunc: "sum" },
  { field: "KorLong", hide: true, aggFunc: "max" },
  { field: "KorLongTDReturn", hide: true, aggFunc: "sum" },
  { field: "KorTouchdowns", hide: true, aggFunc: "sum" },
  { field: "KorFumbles", hide: true, aggFunc: "sum" },
  { field: "PtrNumber", hide: true, aggFunc: "sum" },
  { field: "PtrYards", hide: true, aggFunc: "sum" },
  { field: "PtrLong", hide: true, aggFunc: "sum" },
  { field: "PtrLongTDReturn", hide: true, aggFunc: "sum" },
  { field: "PtrTouchdowns", hide: true, aggFunc: "sum" },
  { field: "PtrFairCatches", hide: true, aggFunc: "sum" },
];

export const PositionTypes = {
  QB: qbStatCol_GameByGame,
  WR: wrStatCol_GameByGame,
  RB: rbStatCol_GameByGame,
};

const sumFunction = (values) => {
  var sum = 0;
  values.forEach(function (value) {
    sum += Number(value);
  });
  return sum;
};
