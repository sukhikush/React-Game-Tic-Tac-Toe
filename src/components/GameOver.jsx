export default function GameOver({ children, restart }) {
  return (
    <div id="game-over">
      <h2>Game Over!!!</h2>
      <p>{children}</p>
      <p className="mt-5">
        <button onClick={restart}>Rematch!</button>
      </p>
    </div>
  );
}
