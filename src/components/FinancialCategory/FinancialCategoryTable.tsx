import React, { ReactNode, useEffect, useState } from "react";
import Table from "../Table/Table";
import { FinancialCategoryInterface } from "../../interfaces/FinancialCategory";
import Spacer from "../Tools/Spacer/Spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface FinancialCategoriesTableProps {
  financialCategories: FinancialCategoryInterface[];
  onEdit: (financialCategory: FinancialCategoryInterface) => void;
  onDelete: (financialCategory: FinancialCategoryInterface) => void;
}

const FinancialCategoriesTable: React.FC<FinancialCategoriesTableProps> = ({
  financialCategories,
  onEdit,
  onDelete,
}) => {
  const headers = ["Label", "Type", "Action"];
  const [financialCategoryData, setFinancialCategoryData] = useState<
    { [key: string]: ReactNode }[]
  >([]);

  const flattenCategoriesWithIndentation = (
    categories: FinancialCategoryInterface[],
    level = 0
  ): { [key: string]: ReactNode }[] => {
    let flattenedCategories: { [key: string]: ReactNode }[] = [];
    categories.forEach((category) => {
      flattenedCategories.push({
        id: category.id,
        Label: (
          <>
            {level !== 0 && "|"}
            <Spacer space={level * 4} charSpace="-" />
            {category.label}
          </>
        ),
        Type: category.type,
        Action: category.user && (
          <>
            <button onClick={() => onEdit(category)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn-delete" onClick={() => onDelete(category)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        ),
      });
      if (category.children && category.children.length > 0) {
        flattenedCategories = flattenedCategories.concat(
          flattenCategoriesWithIndentation(category.children, level + 1)
        );
      }
    });

    return flattenedCategories;
  };

  useEffect(() => {
    if (financialCategories) {
      setFinancialCategoryData(
        flattenCategoriesWithIndentation(financialCategories)
      );
    }
  }, [financialCategories]);

  return (
    <Table
      headers={headers}
      data={financialCategoryData}
      rowClassName={(rowData) => (!rowData["id"] ? "lowlight" : undefined)}
    />
  );
};

export default FinancialCategoriesTable;
