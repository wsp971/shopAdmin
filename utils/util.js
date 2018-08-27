const fs = require('fs');
const path = require('path');




const fileMap = function(basePath,fileMap){
	
	if(!fs.existsSync(basePath)){
		throw `${basePath} 路径不存在`;
		return;
	}
	let files = fs.readdirSync(basePath);
	
	files.forEach(file=>{
		let filePath =  `${basePath}${path.sep}${file}`;
		let stat = fs.lstatSync(filePath);
		if(stat.isDirectory()){
			arguments.callee.call(this, filePath,fileMap);
		}else{
			fileMap[eliminateSuffix(filePath)] = filePath;
		}
		
	})
};


function eliminateSuffix(path){
	let index = path.lastIndexOf('.');
	return path.substr(0,index);
}


exports.fileMap = fileMap;