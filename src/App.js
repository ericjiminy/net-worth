import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import "./App.css";
import {
  assets_data,
  liabilities_data,
  input_error_types,
  input_error_texts,
} from "./constants";
import deleteIcon from "./delete.png";

function App() {
  const [netOld, setNetOld] = useState(0);
  const [netNew, setNetNew] = useState(0);
  const [assetsTotal, setAssetsTotal] = useState(0);
  const [liabilitiesTotal, setLiabilitiesTotal] = useState(0);
  const [assetsData, setAssetsData] = useState(assets_data);
  const [liabilitiesData, setLiabilitiesData] = useState(liabilities_data);
  const [editing, setEditing] = useState(false);
  const [selectedCell, setSelectedCell] = useState();
  const [inputValue, setInputValue] = useState();
  const [inputError, setInputError] = useState(input_error_types[0]);
  const [errorText, setErrorText] = useState("");
  const [hoverRow, setHoverRow] = useState();

  useEffect(() => {
    let newTotal = assetsData
      .map((item) => item[1])
      .reduce((a, b) => parseInt(a) + parseInt(b));
    setAssetsTotal(newTotal);
  }, [assetsData]);

  useEffect(() => {
    let newTotal = liabilitiesData
      .map((item) => item[1])
      .reduce((a, b) => parseInt(a) + parseInt(b));
    setLiabilitiesTotal(newTotal);
  }, [liabilitiesData]);

  useEffect(() => {
    const total = parseFloat(assetsTotal) + parseFloat(liabilitiesTotal);
    const percentAssets =
      total !== 0 ? Math.round((assetsTotal / total) * 100) : 0;
    const percentLiabilities =
      total !== 0 ? Math.round((liabilitiesTotal / total) * 100) : 0;

    let asset_bar = document.getElementById("assetBar");
    let liability_bar = document.getElementById("liabilityBar");
    asset_bar.style.width = percentAssets + "%";
    liability_bar.style.width = percentLiabilities + "%";

    setNetOld(netNew);
    setNetNew(assetsTotal - liabilitiesTotal);
  }, [assetsTotal, liabilitiesTotal]);

  useEffect(() => {
    let newErrorText = "";
    switch (inputError) {
      case "empty":
        newErrorText = input_error_texts[0];
        break;
      case "number":
        newErrorText = input_error_texts[1];
        break;
      case "commas":
        newErrorText = input_error_texts[2];
        break;
      default:
        break;
    }
    setErrorText(newErrorText);
  }, [inputError]);

  const handleLabelClick = (i, type) => {
    setSelectedCell([i, 0, type]);
    setEditing(true);
  };

  const handleValueClick = (i, type) => {
    setSelectedCell([i, 1, type]);
    setEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setInputValue("");
    setInputError(input_error_types[0]);
  };

  const handleSaveClick = () => {
    if (!inputValue) {
      setInputError(input_error_types[1]);
      return;
    }
    if (selectedCell[1] === 1 && isNaN(inputValue)) {
      if (inputValue.includes(",")) {
        setInputError(input_error_types[3]);
      } else setInputError(input_error_types[2]);
      return;
    }

    if (selectedCell[2] === "asset") {
      let updatedData = [...assetsData];
      let updatedRow = [...assetsData[selectedCell[0]]];
      updatedRow[selectedCell[1]] = inputValue;
      updatedData[selectedCell[0]] = updatedRow;
      setAssetsData(updatedData);
      localStorage.setItem("assets_data", JSON.stringify(updatedData));
    } else {
      let updatedData = [...liabilitiesData];
      let updatedRow = [...liabilitiesData[selectedCell[0]]];
      updatedRow[selectedCell[1]] = inputValue;
      updatedData[selectedCell[0]] = updatedRow;
      setLiabilitiesData(updatedData);
      localStorage.setItem("liabilities_data", JSON.stringify(updatedData));
    }

    setEditing(false);
    setInputValue("");
    setInputError(input_error_types[0]);
  };

  const handleAddRowClick = (type) => {
    if (type === 0) {
      setAssetsData([...assetsData, ["______ ", 0]]);
    } else {
      setLiabilitiesData([...liabilitiesData, ["______ ", 0]]);
    }
  };

  const handleDeleteRowClick = (row, type) => {
    if (type === 0) {
      if (assetsData.length === 1) return;
      setAssetsData(assetsData.filter((item, i) => i !== row));
    } else {
      if (liabilitiesData.length === 1) return;
      setLiabilitiesData(liabilitiesData.filter((item, i) => i !== row));
    }
  };

  const handleResetClick = () => {
    setAssetsData(assets_data);
    setLiabilitiesData(liabilities_data);
  };

  const handleRestoreClick = () => {
    let assets = JSON.parse(localStorage.getItem("assets_data"));
    let liabilities = JSON.parse(localStorage.getItem("liabilities_data"));

    if (assets) setAssetsData(assets);
    if (liabilities) setLiabilitiesData(liabilities);
  };

  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/ericjiminy/", "_blank").focus();
  };

  const addCommas = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="app">
      {editing ? (
        <div className="editingDiv">
          <div className="editingBox">
            <div className="editingLabel">Type a new value:</div>
            <input
              id={inputError !== "none" ? "inputError" : ""}
              className="editingInput"
              onChange={(e) => handleInputChange(e)}
              autoFocus
            />
            {inputError !== "none" ? (
              <div className="errorText">{errorText}</div>
            ) : (
              ""
            )}
            <div className="editingButtons">
              <div
                className="editingCancel"
                onClick={() => handleCancelClick()}
              >
                Cancel
              </div>
              <div className="editingSave" onClick={() => handleSaveClick()}>
                Save
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="titleDiv">
        <div className="title">Net Worth Calculator</div>
        <div className="toolbar">
          <div className="button" onClick={() => handleResetClick()}>
            Reset Values
          </div>
          <div className="button" onClick={() => handleRestoreClick()}>
            Restore Session
          </div>
          <div className="button" onClick={() => handleLinkedinClick()}>
            LinkedIn
          </div>
        </div>
      </div>

      <div className="totalDiv">
        <div className="assetBarDiv">
          <div id="assetBar" />
        </div>
        <div className="total">
          Net Worth: $
          <CountUp start={netOld} end={netNew} delay={0} duration={2} />
        </div>
        <div className="liabilityBarDiv">
          <div id="liabilityBar" />
        </div>
      </div>

      <div className="assets_and_liabilities">
        <div className="assets">
          <div className="assets_total">Assets: ${addCommas(assetsTotal)}</div>
          <div className="assets_items">
            {assetsData.map((item, i) => (
              <div
                className="item"
                onMouseEnter={() => {
                  setHoverRow([i, 0]);
                }}
                onMouseLeave={() => {
                  setHoverRow();
                }}
                id={
                  hoverRow && hoverRow[0] === i && hoverRow[1] === 0
                    ? "hoverRow"
                    : ""
                }
              >
                <div className="itemLabelDiv">
                  <div
                    className="itemLabel"
                    onClick={() => handleLabelClick(i, "asset")}
                  >
                    {item[0]}
                  </div>
                  <div className="itemColon">: </div>
                </div>
                <div className="itemValueDiv">
                  <div className="itemDollar">$</div>
                  <div
                    className="itemValue"
                    onClick={() => handleValueClick(i, "asset")}
                  >
                    {addCommas(item[1])}
                  </div>
                  {hoverRow && hoverRow[0] === i && hoverRow[1] === 0 ? (
                    <img
                      className="deleteRow"
                      src={deleteIcon}
                      width={20}
                      height={20}
                      onClick={() => handleDeleteRowClick(i, 0)}
                    />
                  ) : (
                    <div className="deleteRowPlaceholder" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="addAsset" onClick={() => handleAddRowClick(0)}>
            Add Row
          </div>
        </div>

        <div className="liabilities">
          <div className="liabilities_total">
            Liabilities: ${addCommas(liabilitiesTotal)}
          </div>
          <div className="liabilities_items">
            {liabilitiesData.map((item, i) => (
              <div
                className="item"
                onMouseEnter={() => {
                  setHoverRow([i, 1]);
                }}
                onMouseLeave={() => {
                  setHoverRow();
                }}
                id={
                  hoverRow && hoverRow[0] === i && hoverRow[1] === 1
                    ? "hoverRow"
                    : ""
                }
              >
                <div className="itemLabelDiv">
                  <div
                    className="itemLabel"
                    onClick={() => handleLabelClick(i, "liability")}
                  >
                    {item[0]}
                  </div>
                  <div className="itemColon">: </div>
                </div>
                <div className="itemValueDiv">
                  <div className="itemDollar">$</div>
                  <div
                    className="itemValue"
                    onClick={() => handleValueClick(i, "liability")}
                  >
                    {addCommas(item[1])}
                  </div>
                  {hoverRow && hoverRow[0] === i && hoverRow[1] === 1 ? (
                    <img
                      className="deleteRow"
                      src={deleteIcon}
                      width={20}
                      height={20}
                      onClick={() => handleDeleteRowClick(i, 1)}
                    />
                  ) : (
                    <div className="deleteRowPlaceholder" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="addLiability" onClick={() => handleAddRowClick(1)}>
            Add Row
          </div>
        </div>
      </div>

      <div className="footer" />
    </div>
  );
}

export default App;
