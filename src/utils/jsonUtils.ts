export const isJson = (jsonStr: string) => {
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    return false;
  }
  return true;
};

export const prettifyJson = (json: any) => {
  return Object.keys(json)
    .map(key => `${key.toUpperCase()}: ${json[key]}`)
    .join();
};
