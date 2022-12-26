import { useState } from 'react';

function useToggle() {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(prev => !prev);
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return { visible, toggle, show, hide };
}

export default useToggle;
