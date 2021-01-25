import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header name={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => <>{props.name}</>;

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part name={props} />
      <Part name={props} />
      <Part name={props} />
    </>
  );
};
const Total = (props) => {
  console.log(props);
  return (
    <p>
      Total Exercises = {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
