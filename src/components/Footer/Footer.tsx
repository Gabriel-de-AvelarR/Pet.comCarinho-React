import React from 'react';
import { FunctionComponent } from 'react';
import classes from './footer.module.scss';

export const Footer: FunctionComponent = () => {
  return (
    <footer className={classes.footer} data-cy="footer">
      <p>Pet.comCarinho 2023</p>
    </footer>
  );
};

