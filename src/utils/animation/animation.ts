export const createAnimation = () => {
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
  const elements = [];
  const childAnimations = [];
  const supportsAnimationEffect = typeof AnimationEffect === 'function' || typeof window.AnimationEffect === 'function';
  const supportsWebAnimations = typeof Element === 'function' && typeof Element.prototype.animate === 'function' && supportsAnimationEffect;
  const webAnimations = [];

  const addElement = el => {
    if (el != null) {
      elements.push(el);
    }
    return ani;
  };

  const resetFlags = () => {
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
    if (!initialized) {
      initializeAnimation();
    }

    resetAnimation();

    childAnimations.forEach(animation => {
      animation.play();
    });
    if (supportsWebAnimations) {
      playWebAnimations();
    }
    return ani;
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
    } else {
      update(false, step);
    }
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
  };

  const parent = animation => {
    parentAnimation = animation;
    return ani;
  };

  return (ani = {
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
    progressStart,
    progressStep,
  });
};
