const createBackDrop = (clickDisMiss = true) => {
  const cyModal = document.createElement('cy-backdrop');
  if (clickDisMiss) {
    cyModal.onclick = () => {
      document.querySelector('cy-page').removeChild(cyModal);
    };
  }
  document.querySelector('cy-page').appendChild(cyModal);
};

export { createBackDrop };
