export const isPersistedState = (stateName) => {
  const localState = localStorage.getItem(stateName);
  return localState && JSON.parse(localState);
};

export const storeState = (stateName, tasks) => {
  localStorage.setItem(stateName, JSON.stringify(tasks));
};
