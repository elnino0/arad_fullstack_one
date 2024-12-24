import { useState } from "react";

/**
 * A component for filtering movies by name.
 * @param {Object} props
 * @param {function} props.onFind - Callback function called with the movie name when the user clicks the "Find" button.
 * @returns {JSX.Element} A rendered component with an input field for entering a movie name and a button to trigger the search.
 */
const FilterComponent = ({ onFind }) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <label htmlFor="movieName">Find Movies: </label>
      <input
        type="text"
        id="movieName"
        name="movieName"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="button" onClick={() => onFind({ name: query })}>
        Find
      </button>
    </div>
  );
};

export default FilterComponent;
