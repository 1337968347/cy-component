export type AnimationBuilder = (baseEl) => Animation;
export interface Animation {
  parentAnimation: Animation | undefined;
  elements: HTMLElement[];
  childAnimations: Animation[];

  /**
   * Play the animation
   *
   * If the `sync` options is `true`, the animation will play synchronously. This
   * is the equivalent of running the animation
   * with a duration of 0ms.
   */
  play(reset?: boolean): Promise<void>;

  /**
   * Pauses the animation
   */
  pause(): void;

  /**
   * Stop the animation and reset
   * all elements to their initial state
   */
  stop(): void;

  progressStart(forceLinearEasing: boolean, step?: number): void;
  progressStep(step: number): void;

  from(property: string, value: any): Animation;
  to(property: string, value: any): Animation;
  fromTo(property: string, fromValue: any, toValue: any): Animation;

  /**
   * Set the keyframes for the animation.
   */
  keyframes(keyframes: []): Animation;

  /**
   * Group one or more animations together to be controlled by a parent animation.
   */
  addAnimation(animationToAdd: Animation | Animation[]): Animation;

  /**
   * Add one or more elements to the animation
   */
  addElement(el: Element | Element[] | Node | Node[] | NodeList): Animation;

  /**
   * Sets the number of times the animation cycle
   * should be played before stopping.
   */
  iterations(iterations: number): Animation;

  /**
   * Sets how the animation applies styles to its
   * elements before and after the animation's execution.
   */
  fill(fill: string | undefined): Animation;

  /**
   * Sets whether the animation should play forwards,
   * backwards, or alternating back and forth.
   */
  direction(direction: string | undefined): Animation;

  /**
   * Sets the length of time the animation takes
   * to complete one cycle.
   */
  duration(duration: number | undefined): Animation;

  /**
   * Sets how the animation progresses through the
   * duration of each cycle.
   */
  easing(easing: string | undefined): Animation;

  /**
   * Sets when an animation starts (in milliseconds).
   */
  delay(delay: number | undefined): Animation;

  /**
   * Returns the animation's direction.
   */
  getDirection(): string;

  /**
   * Returns the animation's fill mode.
   */
  getFill(): string;

  /**
   * Gets the animation's delay in milliseconds.
   */
  getDelay(): number;

  /**
   * Gets the number of iterations the animation will run.
   */
  getIterations(): number;

  /**
   * Returns the animation's easing.
   */
  getEasing(): string;

  /**
   * Gets the animation's duration in milliseconds.
   */
  getDuration(): number;
}

export const createAnimation = (): Animation => {
  let ani;
  let _delay;
  let _duration;
  let _easing;
  let _iterations;
  let _fill;
  let _direction;
  let _keyframes = [];
  let parentAnimation;
  let initialized = false;
  let finished = false;
  let numAnimationsRunning = 0;
  const onFinishCallbacks = [];
  const elements = [];
  const childAnimations = [];
  const supportsAnimationEffect =
    typeof AnimationEffect === 'function' || typeof window.AnimationEffect === 'function';
  const supportsWebAnimations =
    typeof Element === 'function' &&
    typeof Element.prototype.animate === 'function' &&
    supportsAnimationEffect;
  const webAnimations = [];

  const onFinish = (callBack): (() => void) => {
    onFinishCallbacks.push(callBack);
    return ani;
  };

  const afterAnimation = () => {
    onFinishCallbacks.forEach(aniCallBack => {
      aniCallBack();
    });
    finished = true;
  };

  const animationFinish = () => {
    if (numAnimationsRunning === 0) {
      return;
    }

    numAnimationsRunning--;

    if (numAnimationsRunning === 0) {
      afterAnimation();
      if (parentAnimation) {
        parentAnimation.animationFinish();
      }
    }
  };

  const addElement = el => {
    if (el != null) {
      elements.push(el);
    }
    return ani;
  };

  const resetFlags = () => {
    numAnimationsRunning = 0;
    // eslint-disable-next-line no-trailing-spaces
  };

  const addAnimation = animationToAdd => {
    if (animationToAdd != null) {
      if (Array.isArray(animationToAdd)) {
        for (const animation of animationToAdd) {
          animation.parent(ani);
          childAnimations.push(animation);
        }
      } else {
        animationToAdd.parent(ani);
        childAnimations.push(animationToAdd);
      }
    }
    return ani;
  };

  const keyframes = keyframeValues => {
    _keyframes = keyframeValues;
    return ani;
  };

  const resetAnimation = () => {
    if (supportsWebAnimations) {
      setAnimationStep(0);
      updateWebAnimation();
    }
  };

  const play = () => {
    return new Promise<void>(resolve => {
      if (!initialized) {
        initializeAnimation();
      }
      if (finished) {
        resetAnimation();
        finished = false;
      }

      numAnimationsRunning = childAnimations.length + 1;

      onFinish(() => {
        resolve();
      });
      childAnimations.forEach(animation => {
        animation.play();
      });
      if (supportsWebAnimations) {
        playWebAnimations();
      }
    });
  };

  const stop = () => {
    childAnimations.forEach(animation => {
      animation.stop();
    });
    if (initialized) {
      cleanUpElements();
      initialized = false;
    }

    resetFlags();
  };

  const pauseAnimation = () => {
    if (initialized) {
      if (supportsWebAnimations) {
        webAnimations.forEach(animation => {
          animation.pause();
        });
      }
    }
  };

  const pause = () => {
    childAnimations.forEach(animation => {
      animation.pause();
    });

    pauseAnimation();

    return ani;
  };

  const from = (property, value) => {
    const firstFrame = _keyframes[0];

    if (firstFrame !== undefined && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
      firstFrame[property] = value;
    } else {
      _keyframes = [{ offset: 0, [property]: value }, ..._keyframes];
    }

    return ani;
  };

  const to = (property, value) => {
    const lastFrame = _keyframes[_keyframes.length - 1];

    if (lastFrame !== undefined && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
      lastFrame[property] = value;
    } else {
      _keyframes = [..._keyframes, { offset: 1, [property]: value }];
    }
    return ani;
  };

  const fromTo = (property, fromValue, toValue) => {
    initialized = false;
    return from(property, fromValue).to(property, toValue);
  };

  const progressStart = step => {
    childAnimations.forEach(animation => {
      animation.progressStart(step);
    });
    pauseAnimation();
    if (!initialized) {
      initializeAnimation();
    }
    update(false, step);
    return ani;
  };

  const progressStep = step => {
    childAnimations.forEach(animation => {
      animation.progressStep(step);
    });
    setAnimationStep(step);
    return ani;
  };

  const cleanUpElements = () => {
    if (supportsWebAnimations) {
      webAnimations.forEach(animation => {
        animation.cancel();
      });
      webAnimations.length = 0;
    }
  };

  const playWebAnimations = () => {
    webAnimations.forEach(animation => {
      animation.play();
    });
    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    }
  };

  const initializeAnimation = () => {
    if (_keyframes.length > 0) {
      if (supportsWebAnimations) {
        initializeWebAnimation();
      } else {
        // TODO css Animation
      }
    }
    initialized = true;
  };

  const setAnimationStep = step => {
    step = Math.min(Math.max(step, 0), 0.9999);
    if (supportsWebAnimations) {
      webAnimations.forEach(animation => {
        animation.currentTime = animation.effect.getComputedTiming().delay + getDuration() * step;
        animation.pause();
      });
    }
  };

  const updateWebAnimation = (step = undefined) => {
    webAnimations.map(animation => {
      animation.effect.updateTiming({
        delay: getDelay(),
        duration: getDuration(),
        easing: getEasing(),
        iterations: getIterations(),
        fill: getFill(),
        direction: getDirection(),
      });
    });

    if (step !== undefined) {
      setAnimationStep(step);
    }
  };

  /**
   * 更新动画
   * @param {*} deep
   * @param {*} step ?
   */
  const update = (deep = false, step = undefined) => {
    if (deep) {
      childAnimations.map(animation => {
        animation.update(deep, step);
      });
    }

    if (supportsWebAnimations) {
      updateWebAnimation(step);
    }
    return ani;
  };

  const delay = animationDelay => {
    _delay = animationDelay;

    update(true);

    return ani;
  };

  const getDelay = () => {
    if (_delay !== undefined) {
      return _delay;
    }
    if (parentAnimation) {
      return parentAnimation.getDelay();
    }

    return 0;
  };

  const duration = animationDuration => {
    _duration = animationDuration;
    update(true);
    return ani;
  };

  const getDuration = () => {
    if (_duration !== undefined) {
      return _duration;
    }
    if (parentAnimation) {
      return parentAnimation.getDuration();
    }

    return 0;
  };

  const easing = animationEasing => {
    _easing = animationEasing;
    update(true);
    return ani;
  };

  const getEasing = () => {
    if (_easing !== undefined) {
      return _easing;
    }
    if (parentAnimation) {
      return parentAnimation.getEasing();
    }

    return 'linear';
  };

  const iterations = animationIterations => {
    _iterations = animationIterations;
    update(true);
    return ani;
  };

  const getIterations = () => {
    if (_iterations !== undefined) {
      return _iterations;
    }
    if (parentAnimation) {
      return parentAnimation.getIterations();
    }
    return 1;
  };

  const fill = animationFill => {
    _fill = animationFill;
    update(true);
    return ani;
  };

  const getFill = () => {
    if (_fill !== undefined) {
      return _fill;
    }
    if (parentAnimation) {
      return parentAnimation.getFill();
    }
    return 'both';
  };

  const direction = animationDirection => {
    _direction = animationDirection;
    update(true);
    return ani;
  };

  const getDirection = () => {
    if (_direction !== undefined) {
      return _direction;
    }
    if (parentAnimation) {
      return parentAnimation.getDirection();
    }
    return 'normal';
  };

  const initializeWebAnimation = () => {
    elements.forEach(element => {
      const animation = element.animate(_keyframes, {
        delay: getDelay(),
        duration: getDuration(),
        easing: getEasing(),
        iterations: getIterations(),
        fill: getFill(),
        direction: getDirection(),
      });
      animation.pause();
      webAnimations.push(animation);
    });
    if (webAnimations.length > 0) {
      webAnimations[0].onfinish = () => {
        animationFinish();
      };
    }
  };

  const parent = animation => {
    parentAnimation = animation;
    return ani;
  };

  return (ani = {
    elements,
    childAnimations,
    parentAnimation,
    addElement,
    addAnimation,
    parent,
    keyframes,
    play,
    fromTo,
    from,
    to,
    delay,
    getFill,
    getDirection,
    getDelay,
    getIterations,
    getEasing,
    getDuration,
    duration,
    easing,
    iterations,
    fill,
    direction,
    stop,
    pause,
    update,
    progressStart,
    progressStep,
    animationFinish,
  });
};
