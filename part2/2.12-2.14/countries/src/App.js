import React, { useState, useEffect } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

const Search = ({ search, countries }) => {
  const result = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Country result={result} />
    </>
  );
};

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} style={{ height: 100 }}></img>
    </div>
  );
};

const Country = ({ result }) => {
  const [tempResult, SetResult] = useState({});
  console.log(Object.keys(tempResult).length);
  if (Object.keys(tempResult).length != 0) {
    return <SingleCountry country={tempResult} />;
  }
  if (result.length === 1) {
    return <SingleCountry country={result[0]} />;
  }

  if (result.length > 10)
    return <div>Too many results , Please be more specific</div>;
  else
    return result.map((country) => {
      return (
        <div>
          {country.name}{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              SetResult(country);
            }}
          >
            Show
          </button>
        </div>
      );
    });
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <input value={search} onChange={handleSearch}></input>
      <Search search={search} countries={countries} />
    </div>
  );
};

export default App;
