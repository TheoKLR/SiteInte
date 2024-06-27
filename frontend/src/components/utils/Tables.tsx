import "./Tables.css";

export const toTable = (json: any[]) => {
  if (json.length === 0) return null;
  const keys = Object.keys(json[0]);
  
  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {keys.map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {json.map((object, rowIndex) => (
              <tr key={rowIndex}>
                {keys.map((key, colIndex) => (
                  <td key={colIndex}>
                    {typeof object[key] === 'boolean' ? object[key].toString() : object[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
