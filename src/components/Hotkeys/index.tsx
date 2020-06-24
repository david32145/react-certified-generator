import React from "react";

import HotkeysHelper, { OnKeyFun } from 'react-hot-keys';

interface HotKeysProps {
  onNewText: OnKeyFun
  onNewImage: OnKeyFun
}

const Hotkeys: React.FC<HotKeysProps> = ({
  onNewText,
  onNewImage
}) => {
  return (
    <>
      <HotkeysHelper 
        keyName="ctrl+q"
        onKeyDown={onNewText}
      />
      <HotkeysHelper
        keyName="ctrl+b"
        onKeyDown={onNewImage}
      />
    </>
  );
};

export default Hotkeys;
