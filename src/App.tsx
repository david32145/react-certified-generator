import React from 'react';

import HomePage from 'pages/Home';
import GlobalStyles from 'styles/global';
import { ElementsProvider } from 'context';

function App() {
  return (
    <>
      <ElementsProvider>
        <HomePage />
      </ElementsProvider>
      <GlobalStyles />
    </>
  );
}

export default App;
