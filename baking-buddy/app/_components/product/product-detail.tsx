import styles from "@/css/product-detail.module.css";
import Link from "next/link";

interface ProductDetail {
    id: string;
    name: string;
    price: number;
    description?: string;
    link: string;
    productImageUrl?: string;
    username?: string;
}

// 가격을 천 단위로 구분하는 함수
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ko-KR').format(price);
};

const Product = ({ product }: { product: ProductDetail }) => {
    return (
        <div className={styles.productCard}>
            <img
                className={styles.productImage}
                src={product.productImageUrl || "/placeholder-product.jpg"}
                alt={product.name}
            />
            <h2 className={styles.productName}>{product.name}</h2>
            {product.description && <p className={styles.productDescription}>{product.description}</p>}
            <Link className={styles.productLink} href={product.link}>
                상품 페이지로 이동
            </Link>
            <p className={styles.productPrice}>{formatPrice(product.price)}원</p>
        </div>
    );
};

export default Product;
