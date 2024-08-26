import styles from '@/css/product-list.module.css';
import Link from "next/link";
import {API_URL, EVENT_SERVER_URL} from "@/app/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProductParam {
    id: string;
    name: string;
    price: number;
    description: string;
    link?: string;
    productImageUrl: string;
}

const Product = ({ product }: { product: ProductParam }) => {
    const router = useRouter();

    // 클릭 이벤트 기록 함수
    const recordClick = async (id: string, clickType: string) => {
        try {
            await axios.post(`${EVENT_SERVER_URL}/api/click`, {
                id: id,
                clickType: clickType,
            }, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Error recording click:", error);
        }
    };

    // 클릭 핸들러 함수
    const handleCardClick = async (id: string) => {
        await recordClick(id, "PRODUCT");
        router.push(`/products/${id}`);
    };

    return (
        <div className={styles.productCard} onClick={() => handleCardClick(product.id)}>
            <img className={styles.productImage} src={product.productImageUrl} alt='Product Image' />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>{product.price}원</p>
        </div>
    );
}

export default Product;
