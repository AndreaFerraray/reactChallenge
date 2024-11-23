import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const App = () => {
  const [rows, setRows] = useState([
    { id: 1, value: 0, sign: "+", enabled: true },
  ]);
  const [result, setResult] = useState(0);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      value: 0,
      sign: "+",
      enabled: true,
    };
    setRows([...rows, newRow]);
  };

  //RIMUOVI LA RIGA TRAMITE ID
  const removeRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // CAMBIA SEGNO
  const toggleSign = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, sign: row.sign === "+" ? "-" : "+" } : row
    );
    setRows(updatedRows);
  };

  // ABILITA E DISABILITA'LA RIGA
  const toggleEnabled = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, enabled: !row.enabled } : row
    );
    setRows(updatedRows);
  };

  // AGGIORNA VALORE DELLA RIGA
  const updateValue = (id, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, value: Number(value) || 0 } : row
    );
    setRows(updatedRows);
  };

  // CALCOLO DEL RISULTATO IN TEMPO REALE
  useEffect(() => {
    const calcResult = rows
      .filter((row) => row.enabled)
      .reduce(
        (sum, row) => (row.sign === "+" ? sum + row.value : sum - row.value),
        0
      );
    setResult(calcResult);
  }, [rows]);

  return (
    <div className="container mt-5 w-50 ">
      <h1 className="text-center">React Challenge</h1>
      <div className="mt-4">
        {rows.map((row) => (
          <div key={row.id} className="d-flex align-items-center mb-3">
            <button
              className={`btn ${
                row.sign === "+" ? "btn-success" : "btn-danger"
              } me-2`}
              onClick={() => toggleSign(row.id)}
            >
              {row.sign}
            </button>
            <input
              type="number"
              className="form-control me-2 border-2 border-dark "
              value={row.value}
              onChange={(e) => updateValue(row.id, e.target.value)}
              disabled={!row.enabled}
            />
            <button
              className={`btn ${
                row.enabled ? "btn-secondary" : "btn-warning"
              } me-2`}
              onClick={() => toggleEnabled(row.id)}
            >
              {row.enabled ? "Disable" : "Enable"}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeRow(row.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-primary me-2" onClick={addRow}>
          Add Row
        </button>
      </div>
      <h2 className="mt-4 text-center">Result: {result}</h2>
    </div>
  );
};

export default App;
