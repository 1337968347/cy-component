/**
 *
 * @param {*} option {title : string,duration: number}
 */
const showToast = option => {
  formatOption(option);
  createToastEl(option).then(removeToastElFunc => {
    removeToastElFunc();
  });
};

const formatOption = option => {
  option.duration = option.duration || 2000;
};

const createToastEl = option => {
  return new Promise<() => void>(resolve => {
    const { title, duration } = option;
    const toastEl = document.createElement('div');
    toastEl.classList.add('toast-wrapper');
    toastEl.innerText = title;

    const appEl = getAppEl();
    appEl.appendChild(toastEl);
    addfadeInAnimation(toastEl);

    setTimeout(() => {
      resolve(() => {
        removeToastEl(toastEl, appEl);
      });
    }, duration);
  });
};

const removeToastEl = (toastEl: HTMLElement, uniAppEl: HTMLElement) => {
  addFadeOutAnimation(toastEl);
  //   400ms 动画
  setTimeout(() => {
    uniAppEl.removeChild(toastEl);
  }, 400);
};

const addFadeOutAnimation = (toastEl: HTMLElement) => {
  toastEl.style.setProperty('transform', `translateY(85px)`);
  toastEl.style.setProperty('opacity', `0.01`);
};

const addfadeInAnimation = (toastEl: HTMLElement) => {
  toastEl.style.setProperty('transform', `translateY(85px)`);
  toastEl.style.setProperty('opacity', `0.01`);
  //   加上这行可以触发动画效果
  toastEl.getBoundingClientRect();
  toastEl.classList.add('toast-animated');
  toastEl.style.setProperty('transform', '');
  toastEl.style.setProperty('opacity', ``);
};

const getAppEl = (): HTMLElement => {
  return document.querySelector('cy-page');
};

export { showToast };
