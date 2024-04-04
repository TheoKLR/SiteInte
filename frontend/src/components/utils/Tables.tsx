import "./Tables.css";

export const toTable = (json: any[]) => {
    const keys = Object.keys(json[0]);
  
    return (
      <div>
        <div className="table">
          <table>
            <thead>
              <tr>
                {keys.map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
                {json.map((objet, index) => (
                    <tr key={index}>
                        {keys.map((key, index) => (
                            <td key={index}>{objet[key]}</td>
                        ))}
                  </tr>                
                ))}
            </tbody>    
          </table>
        </div>
      </div>
    );
  };
  