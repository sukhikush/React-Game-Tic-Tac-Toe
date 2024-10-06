export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li key={`${turn.square.row}-${turn.square.col}`}>
          <span className="text-red-800">Move {turns.length - index}.</span>{" "}
          {turn.playerName} ({turn.player}) - selected {turn.square.row},
          {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
