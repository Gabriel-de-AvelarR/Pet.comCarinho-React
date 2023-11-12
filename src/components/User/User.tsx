import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import classes from './user.module.scss';
import { CartProps } from '../Products/Products';
import { Product } from '../Products/Products';

export const User: FunctionComponent = () => {

  const [purchases, setPurchases] = useLocalStorageState<CartProps>('purchases', {});
  const [quantity, setQuantity] = useState(0);

  const getPurchases = () => Object.values(purchases || {});
  
  return (
    <section className={classes.historico}>
      <h1>Historico</h1>

      <div className={classes.container}>
        {getPurchases().map((product) => {
          return(
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <div>Quantidade: {product.quantity}</div>
          </div>
          );
        }
      )
      }
      </div>
    </section>
  );
};
//localStorage.clear();