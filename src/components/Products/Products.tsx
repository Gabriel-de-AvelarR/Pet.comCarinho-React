import React, { FunctionComponent, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { CurrencyFormatter } from '../CurrencyFormatter';
import classes from './products.module.scss';
import { Loader } from '../Loader';

export type Product = {
  id: number;
  thumbnail: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

export interface CartProps {
  [productId: string]: Product;
}

export const Products: FunctionComponent = () => {
  let API_URL="http://localhost:5038/";
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

  useEffect(() => {
    // Load products data from the JSON file
    const fetchProductsData = async () => {
      try {
        const response = await fetch(API_URL+"api/loja/GetNotes").then(response=>response.json());
        const mappedProducts: Product[] = response.map((product: any) => ({
          id: product.id,
          thumbnail: product.img,
          alt: product.alt,
          title: product.titulo,
          description: product.descricao,
          price: parseFloat(product.preco.replace('R$', '').replace(',', '.')),
          quantity: product.quantidade,
        }));
        setProducts(mappedProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setError(true);
        setIsLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const addToCart = (product: Product): void => {
    if (product.quantity >= 1) {
      setCart((prevCart) => ({
        ...prevCart,
        [product.id]: product,
      }));
    } else {
      alert("Esse produto está esgotado");
    }
  };

  const isInCart = (productId: number): boolean => Object.keys(cart || {}).includes(productId.toString());

  if (error) {
    return <h3 className={classes.error}>Um erro ocorreu ao buscar dados do arquivo json.</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.productPage}>
      <div className={classes.container}>
        {products.map((product) => (
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.alt} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Preco: <CurrencyFormatter amount={product.price} /></p>
            <p>Em estoque: {product.quantity}</p>
            <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Adicionar Carrinho</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
