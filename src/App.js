import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

/* 
 * Use a simple list of US states as example data.
 */
import states from './states';

/* 
 * Single, very simple component.
 * Displays React Bootstrap Typehead on top. 
 * When item is selected, displays result on bottom.
 */
const App = () => {

  const [singleSelection, setSingleSelection] = useState([]);

  return (
    <div className="App">
      <div className="search-container">
          <h2>Search</h2>
          <Typeahead
            id="basic-typeahead-single"
            onChange={setSingleSelection}
            options={states}
            placeholder="Choose State"
            selected={singleSelection}
          />
      </div>
      <div className="results-container">
        <h2>Results</h2>
        <p>{ singleSelection.length == 0 ? "Select an item from the drop down." : singleSelection }</p>
      </div>
    </div>
  );
}

export default App;