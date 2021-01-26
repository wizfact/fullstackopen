import { findAllByDisplayValue } from "@testing-library/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const handleClick = () => {
    console.log("button being handled");
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const voteHandle = (selected) => {
    const handler = () => {
      const points = { ...votes };
      points[selected] += 1;
      setVotes(points);
    };
    return handler;
  };

  const displayLargest = () => {
    let numVotes = Object.values(votes);
    let max = numVotes[0];
    let imax = 0;
    for (let i = 0; i < numVotes.length; i++) {
      if (numVotes[i] >= max) {
        imax = i;
        max = numVotes[i];
      }
    }
    return anecdotes[imax];
  };

  //why do I have to click the next anecdote button 1 extra time , every once in a while ??

  return (
    <div>
      <div>{props.anecdotes[selected]}</div>
      <div>Has {votes[selected]} number of votes </div>
      <div>
        <button onClick={voteHandle(selected)}>Vote</button>
      </div>
      <button onClick={handleClick}>Next Anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{displayLargest()}</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
