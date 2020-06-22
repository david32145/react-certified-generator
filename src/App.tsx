import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import HomePage from 'pages/Home';
import GlobalStyles from 'styles/global';
import { ElementsProvider } from 'elements';

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ElementsProvider>
          <HomePage />
        </ElementsProvider>
      </DndProvider>
      <GlobalStyles />
    </>
  );
}

export default App;
