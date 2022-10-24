import React from "react";
import Cell from "./Cell";
import "../index.css";

const Row = (props) => {
  const { row } = props;
  return (
    <div className="row">
      {row.map((item) => {
        return (
          <Cell
            cell={item}
            key={item.id}
            selectionStart={props.selectionStart}
            selectionEnd={props.selectionEnd}
            mouseOver={props.mouseOver}
            hasSelectionStarted={props.hasSelectionStarted}
          />
        );
      })}
    </div>
  );
};

export default Row;
