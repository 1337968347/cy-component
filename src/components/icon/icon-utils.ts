const fetchSvgContentMap = new Map();

const getSvgUrl = name => {
  return `./assets/svg/${name}.svg`;
};

export const getSvgContent = (name: string): Promise<string> => {
  return new Promise(resolve => {
    // if (fetchSvgContentMap.has(name)) {
    //   resolve(fetchSvgContentMap.get(name));
    // }

    if (typeof fetch === 'function') {
      fetch(getSvgUrl(name)).then(res => {
        if (res.ok) {
          res.text().then(svgText => {
            fetchSvgContentMap.set(name, svgText);
            if (svgText) {
              resolve(svgText);
            } else {
              resolve('');
            }
          });
        }
      });
    } else {
      fetchSvgContentMap.set(name, '');
      resolve('');
    }
  });
};
