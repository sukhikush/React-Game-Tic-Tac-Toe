import { useState, useRef } from "react";

export default function Player({
  name: initialPlayerName,
  symbol,
  isActivePlayer,
  playerDetail,
}) {
  const [playerName, setPlayerName] = useState(initialPlayerName);

  const playNameInput = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    if (playNameInput.current) setPlayerName(playNameInput.current?.value);
    setIsEditing((editing) => !editing);
  }

  playerDetail[symbol] = playerName;

  let playerNameHtml = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    playerNameHtml = (
      <input
        type="text"
        required
        defaultValue={playerName}
        ref={playNameInput}
        // onChange={(event) => {
        //   console.log(event);
        //   setPlayerName(event.target.value);
        // }}
      />
    );
    btnCaption = "Save";
  }
  return (
    <li className={isActivePlayer ? "active" : undefined}>
      <span className="player">
        {playerNameHtml}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
