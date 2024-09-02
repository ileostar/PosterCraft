import { UseElementStore } from "@/stores/element";
import hotkeys, { HotkeysEvent, KeyHandler } from "hotkeys-js";
import { useEffect } from "react";

const useBindHotKey = (keys: string, callback: KeyHandler) => {
  useEffect(() => {
    hotkeys(keys, callback);

    return () => {
      hotkeys.unbind(keys, callback);
    };
  }, [callback, keys]);
};

const wrap = (callback: KeyHandler) => {
  const wrapperFn = (e: KeyboardEvent, event: HotkeysEvent) => {
    e.preventDefault();
    callback(e, event);
  };
  return wrapperFn;
};

const useHotKey = () => {
  const {
    currentElement,
    deleteElement,
    setCurrentElement,
    setPastedElement,
    setCopyElement,
    setMoveElement,
    undo,
    redo,
  } = UseElementStore();

  useBindHotKey("ctrl+c, command+c", () => {
    console.log(11);
    setCopyElement(currentElement);
  });
  useBindHotKey("ctrl+v, command+v", () => {
    setPastedElement();
  });
  useBindHotKey("backspace, delete", () => {
    deleteElement(currentElement);
  });
  useBindHotKey("esc", () => {
    setCurrentElement("");
  });
  useBindHotKey(
    "up",
    wrap(() => {
      setMoveElement(currentElement, "Up", 1);
    }),
  );
  useBindHotKey(
    "down",
    wrap(() => {
      setMoveElement(currentElement, "Down", 1);
    }),
  );
  useBindHotKey(
    "left",
    wrap(() => {
      setMoveElement(currentElement, "Left", 1);
    }),
  );
  useBindHotKey(
    "right",
    wrap(() => {
      setMoveElement(currentElement, "Right", 1);
    }),
  );
  useBindHotKey("shift+up", () => {
    setMoveElement(currentElement, "Up", 10);
  });
  useBindHotKey("shift+down", () => {
    setMoveElement(currentElement, "Down", 10);
  });
  useBindHotKey("shift+left", () => {
    setMoveElement(currentElement, "Left", 10);
  });
  useBindHotKey("shift+right", () => {
    setMoveElement(currentElement, "Right", 10);
  });
  useBindHotKey("ctrl+z", () => {
    undo();
  });
  useBindHotKey("ctrl+shift+x", () => {
    redo();
  });
};

export default useHotKey;
