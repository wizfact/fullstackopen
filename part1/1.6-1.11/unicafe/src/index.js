import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = (props) => (
  <td>
    {props.text} {props.value}
  </td>
);

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0)
    return (
      <>
        <h3>No Feedback Given</h3>
      </>
    );
  else
    return (
      <table>
        <tbody>
          <tr>
            <Statistic text="Good" value={props.good}></Statistic>
          </tr>
          <tr>
            <Statistic text="Neutral" value={props.neutral}></Statistic>
          </tr>
          <tr>
            <Statistic text="Bad" value={props.bad}></Statistic>
          </tr>
          <tr>
            <Statistic
              text="All"
              value={props.good + props.neutral + props.bad}
            ></Statistic>
          </tr>
          <tr>Average {props.calcSummary("average")}</tr>
          <tr>Positive {props.calcSummary("positive")}%</tr>
        </tbody>
      </table>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const calcSummary = (choice) => {
    if (choice === "average") return (good - bad) / (good + bad + neutral);
    else if (choice === "positive")
      return (good / (good + bad + neutral)) * 100;
  };
  return (
    <div>
      <h1>Give Feedback Monsieur/Mademoiselle</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="Neutral"
      ></Button>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        calcSummary={calcSummary}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// return (
//    <>
//      <h2>Statistics</h2>
//      <Statistic text="Good" value={props.good}></Statistic>
//      <Statistic text="Neutral" value={props.neutral}></Statistic>
//      <Statistic text="Bad" value={props.bad}></Statistic>
//      <Statistic
//        text="All"
//        value={props.good + props.neutral + props.bad}
//      ></Statistic>

//    </>
//  );
