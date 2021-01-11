let __supportPassage: boolean | undefined;

const supportPassage = (node: Node) => {
  if (__supportPassage !== undefined) {
    return !!__supportPassage;
  }
  try {
    node.addEventListener(
      'optsTest',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          __supportPassage = true;
        },
      }),
    );
  } catch (err) {
    __supportPassage = false;
  }
};

export const addEventListener = (
  el: any,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
  opts: {
    passive?: boolean;
    capture?: boolean;
  },
) => {
  let listenerOpts = null;
  if (supportPassage(el)) {
    listenerOpts = {
      passage: !!opts.passive,
      capture: !!opts.capture,
    };
  } else {
    listenerOpts = !!opts.capture;
  }

  el.addEventListener(eventName, callback, listenerOpts);
  return () => {
    el.removeEventListener(eventName, callback, listenerOpts);
  };
};
