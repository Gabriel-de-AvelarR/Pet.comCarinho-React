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
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

  useEffect(() => {
    // Load products data from the JSON file
    const fetchProductsData = async () => {
      try {
        const response = await fetch('src/components/Products/products.json');
        if (response.ok) {
          const data = await response.json();
          const mappedProducts: Product[] = data.products.map((product: any) => ({
            id: product.id,
            thumbnail: product.img,
            alt: product.alt,
            title: product.titulo,
            description: product.descricao,
            price: parseFloat(product.preco.replace('R$', '').replace(',', '.')),
            quantity: 0,
          }));
          console.log(data.products[0].description)
          setProducts(mappedProducts);
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const addToCart = (product: Product): void => {
    product.quantity = 1;

    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }));
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
            <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Adicionar Carrinho</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
