const koa = require('koa');

//解析post 请求中的body

const bodyParse = require('koa-bodyparser');

const koaRouter = require('koa-router');

const koaStatic = require('koa-static');

const koaConpose = require('koa-compose');                              // 组合中间件


const path  = require('path');



const app = new koa();


// app.use(async (ctx,next)=>{
// 	await next();
// 	ctx.response.type = 'text/html';
// 	ctx.response.body = '<h1> hello koa</h1>'
// });


// app.use(async (ctx, next)=>{
// 	ctx.body = {
// 		url: ctx.url,
// 		method: ctx.method,
// 		params:ctx.request.query,
// 		ctx_params: ctx.query,
// 		ctx_params_string: ctx.querystring
// 	};
// 	await next();
// });

app.use(logger);

const one = async (ctx, next) => {
	console.log('>> one');
	await next();
	console.log('<< one');
}

const two = async (ctx, next) => {
	console.log('>> two');
	next();
	
	var aaa = await testFun();
	console.log(aaa);
	console.log('<< two');
}


async function testFun(){
	return new Promise((resolve)=>{
		resolve('testfun');
	});
}

const three =  (ctx, next) => {
	console.log('>> three');
	next();
	console.log('<< three');
};


const middleWare = koaConpose([one,two,three]);
// app.use(one);
// app.use(two);
// app.use(three);
app.use(middleWare);

// app.use( (ctx,next)=>{
// 	console.log(11111);
// 	next();
// 	console.log(2222);
// });
//
// app.use(async (ctx, next)=>{
// 	console.log(ctx.request.url);
// 	ctx.body = 'hello world';
// 	setTimeout(()=>{console.log('lalallala')},100);
// 	await next();
// 	console.log('33333');

// });




// app.use(bodyParse());
// app.use(koaStatic(path.join(__dirname, './dist')));


const router = new koaRouter();

app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx,next)=>{
	ctx.body = 'hello get';
	await next();
});


// app.use(async ctx=>{
// 	// let params = await parseParam(ctx);
// 	ctx.body = {
// 		method: ctx.method,
// 		url: ctx.url,
// 		params: ctx.request.body
// 	};
// });




function parseParam(ctx){
	
	return new Promise((resolve, reject)=>{
		let paramsdata = '';
		ctx.req.on('data', data=>{paramsdata +=data});
		ctx.req.addListener('end', ()=>{resolve(parseQueryStr(paramsdata))});
	})
}



function logger(ctx,next){
	console.log(`${Date.now()}-${ctx.request.method}-${ctx.request.url}`);
	next();
}

function parseQueryStr(queryStr){
	let queryData = {};
	let queryStrList = queryStr.split('&');
	for(let [index, queryStr] of queryStrList.entries()){
		let itemList = queryStr.split('=');
		queryData[itemList[0]] = decodeURIComponent(itemList[1]);
	}
	return queryData;

}


app.listen(9999);

console.log('app start at port 9999')




