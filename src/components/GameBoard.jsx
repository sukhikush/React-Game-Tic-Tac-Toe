// import { useState } from "react";
// import { cloneDeep } from "lodash";

export default function GameBoard({ onSelectSuare, board }) {
  //   const [GameBoard, setGameBoard] = useState(initGameBoard);

  //   function handleSelectedSquare(rowIndex, colIndex) {
  //     //checking if selected square is empty
  //     if (!GameBoard[rowIndex][colIndex]) {
  //        Manageing State of sqaure clicks
  //       setGameBoard((preVal) => {
  //         const newBoardVal = cloneDeep(preVal);
  //         newBoardVal[rowIndex][colIndex] = activePlayerSymbol;
  //         return newBoardVal;
  //       });
  //       onSelectSuare();
  //     }
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((colData, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => {
                        onSelectSuare(rowIndex, colIndex);
                      }}
                      disabled={colData != null}
                    >
                      {colData}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
