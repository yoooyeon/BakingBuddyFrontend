// components/IngredientsTable.tsx
import React, {useState} from 'react';
import {Table, TableBody, TableRow, TableCell} from "@/components/ui/table";

interface Ingredient {
    name: string;
    amount: string;
    unitDisplayName: string;
    // defaultServings: number;
}

interface IngredientsTableProps {
    ingredients: Ingredient[];
    servings: number;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ingredients, servings: initialServings}) => {
    const [servings, setServings] = useState<number>(initialServings);
    const defaultServings = initialServings;
    const adjustAmount = (amount: string, defaultServings: number, servings: number): string => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || defaultServings <= 0 || servings <= 0) {
            return amount; // Return the original amount if parsing fails or servings are invalid
        }
        // Adjust the amount based on the new servings
        const adjustedAmount = (numericAmount * servings) / defaultServings;
        return adjustedAmount.toFixed(1);
    };
    return (
        <section className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">재료</h3>
            <div className="mb-4">
                <div className="text-sm font-medium">기준 인분:</div>
                <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(parseFloat(e.target.value))}
                    className="border p-2 rounded mt-1"
                />
            </div>
            <Table className="w-full border-separate border-spacing-0">
                <TableBody>
                    {ingredients.map((ingredient, index) => (
                        <TableRow key={index} className="border-b last:border-b-0">
                            <TableCell className="py-2 px-4 text-sm text-gray-700">{ingredient.name}</TableCell>
                            <TableCell
                                className="py-2 px-4 text-sm text-gray-500 text-right">{ingredient.amount} {ingredient.unitDisplayName}</TableCell>
                            <TableCell className="py-2 px-4 text-sm text-gray-500 text-right">
                                {adjustAmount(ingredient.amount, defaultServings, servings)} {ingredient.unitDisplayName}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
};

export default IngredientsTable;
