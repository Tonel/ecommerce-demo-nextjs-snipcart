import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import styles from "../styles/Home.module.css";
import DatoProduct from "../app/components/Product/DatoProduct";
import { request } from "../lib/datocms";
import { responsiveImageFragment } from "../lib/fragments";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
    {
      products: allProducts {
        id
        name
        image {
          responsiveImage(imgixParams: {fm: jpg, fit: crop }) {
            ...responsiveImageFragment
          }
        }
        description
        slug
        price
      }
    }
    ${responsiveImageFragment}
    `,
    preview,
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_PUBLIC_DATOCMS_READONLY_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Home({ subscription }) {
  const {
    data: { products },
  } = useQuerySubscription(subscription);

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
        <script
          src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"
          async
        />
      </Head>

      <main className={styles.main}>
        <h1>E-Commerce in Next.js and SnipCart</h1>

        <div className={styles.grid}>
          {products.map((product, i) => (
            <DatoProduct {...product} key={i} />
          ))}
        </div>
      </main>

      <div
        id="snipcart"
        data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
        hidden
      ></div>
    </div>
  );
}
