export function getUrlParam (queryString,url){
	url = url || location.href;
	let regString = '[&|?]' + queryString + "=([^&]*)";
	let reg = new RegExp(regString);
	let result = reg.exec(url);
	return result && result[1];
};
