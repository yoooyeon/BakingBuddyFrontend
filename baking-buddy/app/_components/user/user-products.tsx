"use client"

import {useState, useEffect} from 'react';
import {API_URL} from '@/app/constants';
import styles from '@/css/directory-recipe.module.css';
import Product from "@/app/_components/product/product";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    productImageUrl: string;
}


const UserProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const data = json.data;
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Unexpected data format:', data);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div>
                {/* <div className={styles.directoryGrid}> */}

                {products.map((product) => (
                    <Product key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default UserProducts;
