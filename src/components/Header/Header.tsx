import React from 'react';
import { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

import logo from '/logo.svg';
import { CartWidget } from '../CartWidget';
import { ProfileWidget } from '../ProfileWidget';
import { CartProps } from '../Products/Products.tsx';
import classes from './header.module.scss';

export const Header: FunctionComponent = () => {

  const [cart,] = useLocalStorageState<CartProps>('cart', {});
  const productsCount: number = Object.keys(cart || {}).length;

  return (
    <header className={classes.header}>
      <div className={classes.brand}>
        <Link to="/">
          <img src={logo} className={classes.logo} alt="Pet.comCarinho" />
        </Link>
      </div>
      <div className={classes.navigation}>
        <Link to="/products">Produtos</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/fale-conosco">Fale Conosco</Link>
      </div>
      <div className={classes.navigation2}>
        <ProfileWidget />
        <CartWidget productsCount={productsCount} />
      </div>
        
    </header>
  );
};
