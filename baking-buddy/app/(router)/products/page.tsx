"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants";
import Product from "@/app/_components/product/product";
import styles from '@/css/product-list.module.css';

interface ProductParam {
    id: string;
    name: string;
    price: number;
    description: string;
    link: string;
    productImageUrl: string;
}

const ProductPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductParam[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/products`, {
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
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div>No products found.</div>;
    }

    return (
        <div className={styles.productGrid}>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductPage;
