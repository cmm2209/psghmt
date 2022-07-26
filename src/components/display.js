import { Link } from "react-router-dom";
import titleList from "./titleList.js";

const display = () => {
  return (
    <div>
      <h2>
        <Link to="/">
          The Center for the History of Music Theory and Literature
        </Link>
      </h2>
      <h3>Treatises</h3>
      <h4>Filter by</h4>
      <button id="latn">Latin</button>
      <button id="Italian">Italian</button>
      <pre>
        <code id="code"></code>
      </pre>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Century</th>
            <th>URL</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default display;
