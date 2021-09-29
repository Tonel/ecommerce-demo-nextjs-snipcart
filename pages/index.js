import Head from 'next/head'
import styles from '../styles/Home.module.css'
import products from "../app/assets/products.json"
import Product from "../app/components/Product/Product";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>E-commerce</title>
                <link rel="icon" href="/favicon.ico" />

                <link rel="preconnect" href="https://cdn.snipcart.com" />
                <link
                    rel="stylesheet"
                    href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css"
                />
            </Head>

            <main className={styles.main}>
                <h1>
                    E-Commerce in Next.js and SnipCart
                </h1>

                <div className={styles.grid}>
                    {
                        products.map((product, i) => <Product {...product} key={i}/>)
                    }
                </div>
            </main>
            <div
                id="snipcart"
                data-api-key="NWMwZWNkZGMtZjU2ZS00YzM3LWFlZjYtMmM5Zjk0MWViZDcxNjM3Njg0OTY0ODg5NTk4MTM3"
                hidden
            />
            <script
                src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"
                async
            />
        </div>
    );
}
