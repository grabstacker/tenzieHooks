import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import "./App.css";
import { nanoid } from "nanoid";
import Stopwatch from "./components/Stopwatch";

function App() {
  //declear state
  const [dieArray, setDieArray] = useState(allNewDice);
  //Game won flag
  const [tenzies, setTenzies] = useState(false);
  //Track rolls it took to win game
  const [numRolls, setNumRolls] = useState(1);
  //check arrays for winning combination
  useEffect(() => {
    //checks every die array item to be the same and returns true if true
    const allHeld = dieArray.every((die) => die.isHeld);
    if (allHeld) {
      //checks every die array item to be the same and returns true if true
      const youWon = dieArray.every((die) => die.value);
      if (youWon) {
        setTenzies(true);
        alert("you won");
      }
    }
    //only runs when diearray changes
  }, [dieArray]);

  //creates a new object to add to the array
  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  //calls generate new dice 10 times and creates an new array from it
  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  //checks for end game resets values or rolls more game dice
  function rollDice() {
    if (tenzies) {
      setDieArray(allNewDice());
      setTenzies(false);
      //user starts a new game when allNewDice is called so start rolls at 1
      setNumRolls(1);
    } else {
      //checks if die isHeld if it is return the die as it is else return a new die
      setNumRolls((prevRolls) => prevRolls + 1);
      setDieArray((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }

  //changes the value of isHeld to true for clicked dice
  function holdDice(id) {
    setDieArray((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  // render the die components and titles with roll dice button
  return (
    <main>
      <div className="title">
        <h1>Tenzies</h1>
        <h4>
          Roll untill all dice are the same. Click <br></br>
          each die to freeze it at its current value<br></br>
          between rolls
        </h4>
      </div>
      <div className="dice-container">
        {dieArray.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            holdDice={() => holdDice(die.id)}
            isHeld={die.isHeld}
          />
        ))}
      </div>
      <button className="die-face-button" onClick={rollDice}>
        {tenzies ? <span>Restart game</span> : <span>Roll Dice</span>}
      </button>
      <button className="die-face-button">
        <span>Rolls: {numRolls}</span>
      </button>
    </main>
  );
}

export default App;
