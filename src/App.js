import { useState } from "react";

const DiceGame = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player1", score: 0, currentThrow: null },
    { id: 2, name: "Player2", score: 0, currentThrow: null },
  ]);

  const [winner, setWinner] = useState("");

  const rollDice = (id) => {
    const rolling = players.map((player) => {
      return id === player.id
        ? {
            ...player,
            currentThrow: Math.floor(Math.random() * 6) + 1,
          }
        : player;
    });
    setPlayers(rolling);
  };

  const compareScore = () => {
    const highestScore = players.reduce((a, b) => {
      return a.currentThrow > b.currentThrow
        ? a
        : a.currentThrow < b.currentThrow
        ? b
        : "It's a tie";
    });
    setWinner(highestScore.name ? highestScore.name : "It's a tie");

    const points = players.map((player) => {
      return player.id === highestScore.id
        ? { ...player, score: player.score + 1, currentThrow: 0 }
        : { ...player, currentThrow: 0 };
    });
    setPlayers(points);
  };

  return (
    <div>
      <h1
        style={{
          margin: 40,
          padding: 30,
          textAlign: "center",
          color: "pink",
          background: "black",
        }}
      >
        Dice Game
      </h1>
      {players.map((player) => {
        return (
          <div style={{ textAlign: "center", color: "green" }}>
            <p>
              {player.name}, current:{" "}
              {player.currentThrow ? player.currentThrow : "Roll the dice"}{" "}
              <button onClick={() => rollDice(player.id)}>Roll dice</button>{" "}
              <b>Points: {player.score}</b>
            </p>
          </div>
        );
      })}
      <div style={{ textAlign: "center", color: "blue" }}>
        <button onClick={compareScore}>Compare Score</button>
        {winner && <h2>{winner}</h2>}
      </div>
    </div>
  );
};

export default DiceGame;
