"use client";
import React, {useEffect, useState, Suspense} from "react";
import {useParams} from "next/navigation";
import {API_URL} from "@/app/constants";
import ProductDetail from "@/app/_components/product/product-detail";
import Link from "next/link";
import styles from "@/css/product-detail.module.css";

interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    link: string;
    productImageUrl?: string;
    username?: string;
}

export default function ProductDetailPage() {
    const loginUsername = localStorage.getItem("username");
    const params = useParams();
    const productId = params.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        if (!product) {
            console.error("No product data available for deletion");
            return;
        }

        if (window.confirm("Are you sure you want to delete this product?")) {
            setIsDeleting(true);
            try {
                const response = await fetch(`${API_URL}/api/products/${product.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    // Handle post-deletion logic, such as navigation or updating a list
                    alert("Product deleted successfully.");
                } else {
                    console.error("Failed to delete product");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const fetchProduct = async () => {
        if (!productId) return;

        try {
            const response = await fetch(`${API_URL}/api/products/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await response.json();
            const data = json.data;
            setProduct(data);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    if (!product) {
        return <div className={styles.noProduct}>No product data available</div>;
    }

    return (
        <div className={styles.container}>
            <Suspense fallback={<div className={styles.loading}>Loading product details...</div>}>
                <ProductDetail product={product}/>
            </Suspense>

            {loginUsername === product.username && (
                <div className={styles.buttonContainer}>
                    <Link href={`/products/${productId}/edit`}>
                        <button className={styles.button}>Edit Product</button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`${styles.button} ${styles.deleteButton}`}
                    >
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </button>
                </div>
            )}
        </div>
    );
}
