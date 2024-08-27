import { UseElementStore } from "@/store/element";
import hotkeys, { KeyHandler,HotkeysEvent } from "hotkeys-js";
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
    e.preventDefault()
    callback(e, event)
  }
  return wrapperFn
}

const useHotKey = () => {
  const {
    currentElement,
    deleteElement,
    setCurrentElement,
    setPastedComponent,
    setCopyComponent,
    setMoveComponent,
  } = UseElementStore();

  useBindHotKey("ctrl+c, command+c", () => {
    console.log(11);
    setCopyComponent(currentElement);
  });
  useBindHotKey("ctrl+v, command+v", () => {
    setPastedComponent();
  });
  useBindHotKey("backspace, delete", () => {
    deleteElement(currentElement);
  });
  useBindHotKey("esc", () => {
    setCurrentElement("");
  });
  useBindHotKey('up', wrap(() => {
    setMoveComponent(currentElement, "Up",1)
  }))
  useBindHotKey('down', wrap(() => {
    setMoveComponent(currentElement, "Down",1)
  }))
  useBindHotKey('left', wrap(() => {
    setMoveComponent(currentElement, "Left",1)
  }))
  useBindHotKey('right', wrap(() => {
    setMoveComponent(currentElement, "Right",1)
  }))
  useBindHotKey('shift+up', () => {
    setMoveComponent(currentElement, "Up",10)
  })
  useBindHotKey('shift+down', () => {
    setMoveComponent(currentElement, "Down",10)
  })
  useBindHotKey('shift+left', () => {
    setMoveComponent(currentElement, "Left",10)
  })
  useBindHotKey('shift+right', () => {
    setMoveComponent(currentElement, "Right",10)
  })
};

export default useHotKey;
