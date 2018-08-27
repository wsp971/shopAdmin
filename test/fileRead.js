var path = require('path');
var fs = require('fs');




//依次打印文件路径
function readDirectory(entryDirectory){
	if(!fs.existsSync(entryDirectory)){
		throw `${entryDirectory}路径不存在！`;
		return;
	}
	
	var files = fs.readdirSync(entryDirectory);
	files.forEach(function(file){
		fs.stat(entryDirectory + path.sep + file , function(err, stat){
			
			if(err){
				console.log(err); return;
			}
			if(stat.isDirectory()){
				readDirectory(entryDirectory + '/' + file);
			}else{
				console.log(entryDirectory + '/' + file);
			}
		});
	});
}


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

var map  = {};

fileMap('js',map);

console.log(map);



//
// console.log(path.sep);
// readDirectory('./js');


