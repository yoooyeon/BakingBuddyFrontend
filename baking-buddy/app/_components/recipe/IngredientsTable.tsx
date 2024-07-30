// components/IngredientsTable.tsx
import React from 'react';
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

interface Ingredient {
  name: string;
  amount: string;
}

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }) => {
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4">재료</h3>
      <Table className="w-full border-separate border-spacing-0">
        <TableBody>
          {ingredients.map((ingredient, index) => (
            <TableRow key={index} className="border-b last:border-b-0">
              <TableCell className="py-2 px-4 text-sm text-gray-700">{ingredient.name}</TableCell>
              <TableCell className="py-2 px-4 text-sm text-gray-500 text-right">{ingredient.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default IngredientsTable;
