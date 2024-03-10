import React from 'react';
import ReactDOM from 'react-dom/client';

import { queryClient } from 'src/shared/api/queryClient.ts';

import { Providers } from './providers/';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers client={queryClient} />
  </React.StrictMode>
);
