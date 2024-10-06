import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import { cloneDeep } from "lodash";
import GameOver from "./components/GameOver";

const initGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const playerDetails = {};

function deriveActvePlayer(gameTurn) {
  let playerSymbol = "X";
  if (gameTurn[0]?.player == "X") playerSymbol = "O";
  return playerSymbol;
}

function calculateGameBoard(gameBoardData, gameTurn) {
  for (const turn of gameTurn) {
    let { square, player } = turn;
    let { row: rowIndex, col: colIndex } = square;
    gameBoardData[rowIndex][colIndex] = player;
  }
}

function calculateWinner(gameBoardData, gameTurn) {
  let matchFound;
  for (const rec of WINNING_COMBINATIONS) {
    let firstBox = gameBoardData[rec[0].row][rec[0].col];
    let secondBox = gameBoardData[rec[1].row][rec[1].col];
    let thirdBox = gameBoardData[rec[2].row][rec[2].col];

    if (firstBox && firstBox == secondBox && firstBox == thirdBox) {
      matchFound = firstBox;
      break;
    }
  }
  if (!matchFound && gameTurn.length == 9) matchFound = "draw";

  return matchFound;
}

function App() {
  const gameBoardData = cloneDeep(initGameBoard);

  //gameTurn => [{},{square:{row:rowIndex,col:colIndex},player:playerSymbol}]
  const [gameTurn, setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  let activePlayer = deriveActvePlayer(gameTurn);
  calculateGameBoard(gameBoardData, gameTurn);
  let matchFound = calculateWinner(gameBoardData, gameTurn);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((preVal) => (preVal == "X" ? "O" : "X"));
    setGameTurn((preVal) => {
      let playerSymbol = deriveActvePlayer(preVal);
      let updatedTrun = [
        {
          square: { row: rowIndex, col: colIndex },
          player: playerSymbol,
          playerName: playerDetails[playerSymbol],
        },
        ...preVal,
      ];
      return updatedTrun;
    });
  }

  function handResartGame() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActivePlayer={activePlayer == "X"}
            playerDetail={playerDetails}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActivePlayer={activePlayer == "O"}
            playerDetail={playerDetails}
          />
        </ol>
        <GameBoard onSelectSuare={handleSelectSquare} board={gameBoardData} />
        {matchFound && (
          <GameOver restart={handResartGame}>
            {matchFound == "draw"
              ? "Game Draw!!"
              : `${playerDetails[matchFound]} Won!!!`}
          </GameOver>
        )}
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
