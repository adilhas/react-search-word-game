import React, { Component, useState } from "react";
import Row from "./Row";
import "../index.css";

const Grid = (props) => {
  const { ws } = props;
  ws.startBox = null;
  ws.endBox = null;

  const [state, setState] = useState({ ws });

  function selectionStart(evt) {
    let id = evt.target.id;
    ws.startBox = ws.getBoxById(id);
    return false;
  }

  function selectionEnd(evt) {
    //let dir;
    if (ws.startBox != null) {
      let id = evt.target.id;
      ws.endBox = ws.getBoxById(id);
    }
    if (ws.startBox && ws.endBox) {
      let strObj = ws.getStringBetweenPoints(ws.startBox, ws.endBox);
      let str = strObj.str;
      let obj = ws.TestString(str);
      if (obj.match && !obj.found) {
        ws.alreadyFound.push(str);
        ws.wordList.forEach((item) => {
          // console.log(
          //   str.split("").reverse().join("").toLowerCase(),
          //   item.text.toLowerCase()
          // );
          if (
            item.text.toLowerCase() === str.toLowerCase() ||
            str.split("").reverse().join("").toLowerCase() ===
              item.text.toLowerCase()
          ) {
            item.found = true;
            // console.log(item);
          }
        });
        strObj.ids.forEach((item) => {
          let [i, j] = item;
          ws.gridArr[i][j].used = true;
        });
      }

      ws.startBox = null;
      ws.endBox = null;
      setState({ ws });
      return false;
    }
  }

  function hasSelectionStarted() {
    return ws.startBox;
  }

  let gridStyle = {
    width: 40 * ws.gridSize + "px",
    height: 40 * ws.gridSize + "px",
    borderRadius: "2px",
  };
  let gridArr = ws.gridArr.slice();
  let wordList = ws.wordList.slice();
  let toastVisible = ws.wordList.length === ws.alreadyFound.length;

  return (
    <div id="root">
      <div className="grid" style={gridStyle}>
        {gridArr.map((row, i) => {
          return (
            <Row
              row={row}
              rowIndex={i}
              key={i}
              selectionStart={selectionStart}
              selectionEnd={selectionEnd}
              hasSelectionStarted={hasSelectionStarted}
            />
          );
        })}
      </div>
      <div id="word-list">
        <div
          style={{ display: toastVisible ? "block" : "block" }}
          className="ws-my-page-success-toast"
        >
          Index
        </div>
        <ul>
          {wordList.map((item, i) => {
            console.log("item", item);
            let styleObj = {
              textDecoration: item.found ? "line-through" : "none",
            };
            return (
              <li key={i} style={styleObj}>
                {item.question}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const SuccessToast = (props) => {
  let state = {
    visible: props.visible,
    message: props.message,
  };
  alert(props.visible);

  let styleObj = {
    display: state.visible ? "block" : "block",
    position: "absolute",
    right: 0,
    bottom: 0,
  };
  return <div style={styleObj}>{state.message}</div>;
};

export default Grid;
