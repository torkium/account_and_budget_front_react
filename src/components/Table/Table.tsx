import React from "react"
import "./table.css"

interface TableProps {
  headers: string[]
  data: { [key: string]: React.ReactNode }[]
  rowClassName?: (rowData: { [key: string]: React.ReactNode }) => string | undefined
}

const Table: React.FC<TableProps> = ({ headers, data, rowClassName }) => {
    return (
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowClassName ? rowClassName(row) : undefined}>
                {headers.map((header, cellIndex) => {
                  // Ici, on vérifie si la clé (header) existe dans la ligne (row) avant de rendre la cellule
                  return row.hasOwnProperty(header) ? (
                    <td key={cellIndex}>{row[header]}</td>
                  ) : (
                    <td key={cellIndex}></td> // Rend un td vide si la donnée correspondant à l'en-tête n'existe pas
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  

export default Table
