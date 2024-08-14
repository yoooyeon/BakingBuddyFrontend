"use client";
import { useState } from "react";
import styles from "@/css/register-page.module.css";
import { API_URL } from "@/app/constants";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset success and error messages
        setError(null);
        setSuccess(null);

        // Create FormData to send the image file
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        if (productImage) {
            formData.append("productImage", productImage);
        }

        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to register product");
            }

            setSuccess("Product registered successfully!");
            // Reset form fields
            setName("");
            setPrice("");
            setDescription("");
            setProductImage(null);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.h1}>상품 등록하기</h1>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>상품명</label>
                    <input
                        type="text"
                        id="name"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>가격</label>
                    <input
                        type="number"
                        id="price"
                        className={styles.input}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>상품 설명</label>
                    <textarea
                        id="description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="productImage" className={styles.label}>파일 선택</label>
                    <input
                        type="file"
                        id="productImage"
                        className={styles.input}
                        accept="image/*"
                        onChange={handleFileChange}
                        // required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <button type="submit" className={styles.submitButton}>상품 등록하기</button>
            </form>
        </div>
    );
};

export default RegisterPage;
