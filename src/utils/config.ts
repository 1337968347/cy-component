export type ViewMode = 'light' | 'dark';
export type Color = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'medium' | 'dark' | 'light';
export interface CyConfig {
  preferColor: Color;
  viewMode: ViewMode;
}

const STORAGEKEY = 'CONFIG';
export const createConfigMananger = () => {
  let config: CyConfig;

  try {
    const configStr = localStorage.getItem(STORAGEKEY) || '{}';
    config = JSON.parse(configStr) as CyConfig;
  } catch (error) {
    config = {
      preferColor: 'primary',
      viewMode: 'light',
    };
  }

  const getPreferColor = () => {
    return config.preferColor || 'primary';
  };

  const getViewMode = () => {
    return config.viewMode || 'light';
  };

  const setViewMode = (viewMode: ViewMode) => {
    config.viewMode = viewMode;
    if (viewMode === 'light') {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
    saveStorage();
  };

  const setPreferColor = (color: Color) => {
    config.preferColor = color;
    saveStorage();
  };

  const saveStorage = () => {
    localStorage.setItem(STORAGEKEY, JSON.stringify(config));
  };

  setViewMode(getViewMode())
  
  return {
    getPreferColor,
    getViewMode,
    setViewMode,
    setPreferColor,
  };
};

export const configManager = createConfigMananger();
