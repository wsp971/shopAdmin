function getUrlParam(queryString, url = location.href) {
  const regString = `[&|?]${queryString}=([^&]*)`;
  const reg = new RegExp(regString);
  const result = reg.exec(url);
  return result && result[1];
}

export default {
  getUrlParam,
};
