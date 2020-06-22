import React from "react";

import HotkeysHelper from 'react-hot-keys';

interface HotKeysProps {
  onNewText: () => void
}

const Hotkeys: React.FC<HotKeysProps> = ({
  onNewText
}) => {
  return (
    <>
      <HotkeysHelper 
        keyName="ctrl+q"
        onKeyDown={onNewText}
      />
    </>
  );
};

export default Hotkeys;
