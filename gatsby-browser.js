import React from 'react';
import Analytics from './src/components/Analytics';

export const wrapPageElement = ({ element, props }) => (
  <>
    {element}
    <Analytics location={props.location} />
  </>
);
