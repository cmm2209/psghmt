import React from "react";

const FilterCol = () => {
  return (
    <div>
      <h4>Language</h4>
      <input
        type="checkbox"
        id="Latin"
        name="tongue"
        className="cb"
        value="Latin"
      />
      <label htmlFor="Latin">Latin</label>
      <br />
      <input
        type="checkbox"
        id="Italian"
        name="tongue"
        className="cb"
        value="Italian"
      />
      <label htmlFor="Italian">Italian</label>
      <br />
      <input
        type="checkbox"
        id="French"
        name="tongue"
        className="cb"
        value="French"
      />
      <label htmlFor="French">French</label>
      <br />
      <input
        type="checkbox"
        id="English"
        name="tongue"
        className="cb"
        value="English"
      />
      <label htmlFor="English">English</label>
      <h4>Century</h4>
      <input
        type="checkbox"
        id="fifthc"
        name="century"
        className="cb"
        value="4"
      />
      <label htmlFor="fifthc">400-499</label>
      <br />
      <input
        type="checkbox"
        id="sixthc"
        name="century"
        className="cb"
        value="5"
      />
      <label htmlFor="fifteenthc">500-599</label>
      <br />
      <input
        type="checkbox"
        id="fifteenthc"
        name="century"
        className="cb"
        value="14"
      />
      <label htmlFor="fifteenthc">1400-1499</label>
      <br />
      <input
        type="checkbox"
        id="sixteenthc"
        name="century"
        className="cb"
        value="15"
      />
      <label htmlFor="sixteenthc">1500-1599</label>
      <br />
      <input
        type="checkbox"
        id="seventeenthc"
        name="century"
        className="cb"
        value="16"
      />
      <label htmlFor="seventeenthc">1600-1699</label>
      <br />
      <input
        type="checkbox"
        id="eighteenthc"
        name="century"
        className="cb"
        value="17"
      />
      <label htmlFor="eighteenthc">1700-1799</label>
      <br />
      <br />
    </div>
  );
};

export default FilterCol;
