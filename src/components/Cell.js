import { useEffect, useState } from "react";
import "../index.css";

const Cell = (props) => {
  const [state, setState] = useState({
    hilighted: false,
  });

  function mouseOver(evt) {
    setState({
      hilighted: true,
    });
  }

  function mouseOut(evt) {
    let id = evt.target.id;
    let startBox = props.hasSelectionStarted();
    let hilighted = false;
    if (startBox && startBox.id === id) {
      hilighted = true;
    }
    setState({
      hilighted: hilighted,
    });
  }

  useEffect(() => {
    if (state.hilighted && !props.hasSelectionStarted()) {
      return {
        hilighted: false,
      };
    }
    return;
  }, []);

  let cell = props.cell;
  let id = cell.id;
  let currClass = "cell" + (cell.used || state.hilighted ? " hilighted" : "");

  return (
    <div
      className={currClass}
      id={id}
      onMouseDown={props.selectionStart}
      onMouseUp={props.selectionEnd}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      {cell.letter}
    </div>
  );
};

export default Cell;
