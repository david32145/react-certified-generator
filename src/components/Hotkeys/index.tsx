import React from "react";

import HotkeysHelper, { OnKeyFun } from 'react-hot-keys';

interface HotKeysProps {
  onNewText: OnKeyFun
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
