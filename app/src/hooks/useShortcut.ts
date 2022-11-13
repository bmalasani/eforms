import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useShortCut = (key: string, callback: Function, node = null) => {
  const callbackRef = useRef(callback);
  const commandKey = useRef(false);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        commandKey.current = true;
      }
      if (event.key.toLowerCase() === key.toLowerCase() && commandKey.current) {
        callbackRef.current();
        commandKey.current = false;
      }
    },
    [key]
  );

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode.addEventListener('keydown', handleKeyPress);
    return () => {
      targetNode.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, node]);
};
