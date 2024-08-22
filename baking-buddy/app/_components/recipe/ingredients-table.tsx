import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import styles from '@/css/ingredients-table.module.css';

interface Ingredient {
    name: string;
    amount: string;
    unitDisplayName: string;
}

interface IngredientsTableProps {
    ingredients: Ingredient[];
    servings: number;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients, servings: initialServings }) => {
    const [servings, setServings] = useState<number>(initialServings);
    const defaultServings = initialServings;

    // 양을 조정하는 함수 (소수점 첫째 자리까지 표시, .0 제거)
    const adjustAmount = (amount: string, defaultServings: number, servings: number): string => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || defaultServings <= 0 || servings <= 0) {
            return amount; // 파싱 실패 시 원래 양을 반환
        }
        // 양을 새로운 인분에 맞게 조정
        const adjustedAmount = (numericAmount * servings) / defaultServings;
        // 소수점 첫째 자리까지 표시하고, .0은 제거
        return adjustedAmount % 1 === 0 ? adjustedAmount.toFixed(0) : adjustedAmount.toFixed(1);
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
