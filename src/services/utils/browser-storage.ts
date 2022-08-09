export const getLocalStorage = (item: string) => {
  try {
    console.log(localStorage.getItem(item));
    return JSON.parse(localStorage.getItem(item));
  } catch (err) {
    console.log('Can not get Local Storage at ' + item);
  }
};

export const setLocalStorage = (item: string, data: any) => {
  try {
    localStorage.setItem(item, JSON.stringify(data));
  } catch (err) {
    console.log('Can not set Local Storage at ' + item);
  }
};
