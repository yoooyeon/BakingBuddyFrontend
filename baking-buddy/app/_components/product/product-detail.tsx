import styles from '@/css/product-list.module.css';
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

const Product = ({product}: { product: ProductDetail }) => {
    return (
            <div className={styles.productCard}>
                {/*<img className={styles.productImage} src="https://picsum.photos/seed/picsum/200/300"*/}
                {/*     alt={product.name}/>*/}
                <img className={styles.productImage} src={product.productImageUrl} alt={product.name} />
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDescription}>{product.description}</p>
                <Link className={styles.productDescription} href={product.link}>상품 페이지로 이동</Link>
                <p className={styles.productPrice}>{product.price}원</p>
            </div>
    );
}

export default Product;
