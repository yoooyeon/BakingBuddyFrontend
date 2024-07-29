// components/IngredientsTable.tsx
import React from 'react';
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

interface Ingredient {
  name: string;
//   amount: string;
}

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold">재료</h3>
      <Table>
        <TableBody>
          {ingredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell>{ingredient.name}</TableCell>
              {/* <TableCell className="text-right">{ingredient.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default IngredientsTable;
