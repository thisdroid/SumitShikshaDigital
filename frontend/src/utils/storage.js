// storage.js

// Get item (returns array/object or default)
export const getItem = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Set item
export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Remove item
export const removeItem = (key) => {
  localStorage.removeItem(key);
};

// Update item (with updater function)
export const updateItem = (key, updater) => {
  const current = getItem(key);
  const updated = updater(current);
  setItem(key, updated);
  return updated;
};

// Example: Async wrappers for future backend compatibility
export const getItemAsync = async (key, defaultValue = []) => getItem(key, defaultValue);
export const setItemAsync = async (key, value) => setItem(key, value);
export const removeItemAsync = async (key) => removeItem(key);
export const updateItemAsync = async (key, updater) => updateItem(key, updater);