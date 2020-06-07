export function getUrlParam (queryString, url) {
    url = url || location.href;
    const regString = '[&|?]' + queryString + '=([^&]*)';
    const reg = new RegExp(regString);
    const result = reg.exec(url);
    return result && result[1];
}

