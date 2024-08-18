import styles from '@/css/product-list.module.css';
import Link from "next/link";

interface ProductParam {
    id: string;
    name: string;
    price: number;
    description: string;
    productImageUrl: string;
}

const Product = ({product}: { product: ProductParam }) => {
    console.log(product.id)
    return (
        <Link href={`/products/${product.id}`}>
            <div className={styles.productCard}>
                <img className={styles.productImage} src="https://picsum.photos/seed/picsum/200/300"
                     alt={product.name}/>
                {/*<img className={styles.productImage} src={product.productImageUrl} alt={product.name} />*/}
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>{product.price}원</p>
            </div>
        </Link>
    );
}

export default Product;
