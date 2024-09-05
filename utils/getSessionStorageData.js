// use this function to get session storageData

const getSessionStorageData = (key) => {
  if (typeof window === "undefined") {
    return null;
  } else {
    const data = sessionStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data); //if the data is in JSON format
      } catch (error) {
        return data; // if the data is not JSON format
      }
    } else {
      return null;
    }
  }
};

export default getSessionStorageData;
