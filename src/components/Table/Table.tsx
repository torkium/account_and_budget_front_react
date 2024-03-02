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
                  const cellContent = row[header];
                  const isReactNode = React.isValidElement(cellContent);

                  return (
                    <td key={cellIndex}>
                      {isReactNode ? cellContent : (cellContent ?? '')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const VerticalTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="table-responsive">
      <table>
        <tbody>
          {headers.map((header, headerIndex) => (
            <tr key={headerIndex}>
              <th>{header}</th>
              {data.map((row, rowIndex) => (
                <td key={`${headerIndex}-${rowIndex}`}>
                  {row.hasOwnProperty(header) ? row[header] : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
