module.exports=function(app){
	app.use("/",require("./login"));
	app.use("/",require("./register"));
	app.use("/",require("./ui"));
	app.use("/",require("./page"));
}