import React from 'react';
const DRAWER_STATE = 'DRAWER_STATE';
const userStore = window.localStorage;

function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = userStore.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      userStore.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
}

export function useToggleDrawer() {
  const [openState, setDrawerState] = useStorage(DRAWER_STATE);

  const open = typeof openState !== 'undefined' ? openState : false;

  function openDrawer() {
    setDrawerState(true);
  }
  function closeDrawer() {
    setDrawerState(false);
  }

  return {
    open,
    openDrawer,
    closeDrawer,
  };
}
