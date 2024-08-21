import styles from '@/css/product-list.module.css';
import Link from "next/link";

interface ProductParam {
    id: string;
    name: string;
    price: number;
    description: string;
    link?: string;
    productImageUrl: string;
}

const Product = ({product}: { product: ProductParam }) => {
    return (
        <Link href={`/products/${product.id}`}>
            <div className={styles.productCard}>
                <img className={styles.productImage} src={product.productImageUrl} alt='이미지' />
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>{product.price}원</p>
            </div>
        </Link>
    );
}

export default Product;
