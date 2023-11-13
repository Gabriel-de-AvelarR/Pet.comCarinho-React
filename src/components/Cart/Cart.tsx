import React, { FunctionComponent, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Quantifier } from '../Quantifier';
import { CartProps } from '../Products/Products.tsx';
import { TotalPrice } from '../TotalPrice';
import { Operation } from '../Quantifier/Quantifier.tsx';
import classes from './cart.module.scss';
import { useLocation } from 'react-router-dom';
import { Product } from '../Products/Products.tsx';

export const Cart: FunctionComponent = () => {
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const [purchases, setPurchases] = useLocalStorageState<CartProps>('purchases', {});
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const handleRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const addToPurchases = (product: Product): void => {
    setPurchases((prevPurchases) => ({
      ...prevPurchases,
      [product.id]: product,
    }));
  };

  const handleUpdateQuantity = (productId: number, operation: Operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === 'increase') {
          updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity + 1 };
        } else {
          updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity - 1 };
        }
      }
      return updatedCart;
    });
  };

  const getProducts = () => Object.values(cart || {});

  const totalPrice = getProducts().reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);

  const isInputsFilled = cardNumber.trim() !== '' && expiryDate.trim() !== '' && securityCode.trim() !== '';

  const handleComprar = () => {
    // Salvar os produtos 
    getProducts().forEach((prod) => {
      addToPurchases(prod);
    });

    // Clear the cart
    setCart({});
    
    // Show an alert
    alert('Compra realizada');
  };

  const handleGenerateRandomNumber = () => {
    const numericValue = parseInt(cardNumber, 10);

    if (!isNaN(numericValue)) {
      // If input is a valid number, generate a random number
      const random = Math.floor(Math.random() * numericValue) + 1;
      setRandomNumber(random);
    } else {
      // If input is not a valid number, reset random number
      setRandomNumber(null);
    }
  };

  return (
    <section className={classes.cart}>
      <h1>Cart</h1>

      <div className={classes.container}>
        {getProducts().map((product) => (
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <Quantifier
              removeProductCallback={() => handleRemoveProduct(product.id)}
              productId={product.id}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        ))}
      </div>
      <TotalPrice amount={totalPrice} />
      <ul>
        <li>
          Número Cartão:
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        </li>
        <li>
          Data de validade:
          <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
        </li>
        <li>
          Código:
          <input type="text" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} required />
        </li>
        <li>
          CEP:
          <input type="text" onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))} required />
          <button onClick={handleGenerateRandomNumber}>Calcular Frete</button>
        </li>
      </ul>

      <button onClick={handleComprar} disabled={!isInputsFilled}>
        Comprar
      </button>
    </section>
  );
};
