import React, { ReactNode } from "react";
import "./table.css";

interface TableProps {
  headers: string[];
  data: { [key: string]: React.ReactNode }[];
  rowClassName?: (rowData: {
    [key: string]: React.ReactNode;
  }) => string | undefined;
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
          {data.map((row, rowIndex) => {
            const isEvenRow = rowIndex % 2 === 0;
            const additionalRowClass = rowClassName ? rowClassName(row) : '';
            const rowClassNames = [
              isEvenRow ? 'even-row' : 'odd-row',
              additionalRowClass
            ].filter(Boolean).join(' ');

            return (
              <tr key={rowIndex} className={rowClassNames}>
                {headers.map((header, cellIndex) => {
                  return row.hasOwnProperty(header) ? (
                    <td key={cellIndex}>{row[header]}</td>
                  ) : (
                    <td key={cellIndex}></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
