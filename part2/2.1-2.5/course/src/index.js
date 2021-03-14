import React from "react";
import ReactDOM from "react-dom";
import Course from "./Course";

const AllCourse = (props) => {
  return (
    <div>
      {props.courses.map((course) => (
        <Course course={course} />
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component part1",
          exercises: 14,
          id: 3,
        },
        {
          name: "State of a component part2",
          exercises: 14,
          id: 4,
        },
        {
          name: "Redux Course",
          exercises: 14,
          id: 5,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <AllCourse courses={courses} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
