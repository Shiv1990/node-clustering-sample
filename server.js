var cluster = require("cluster");

var cpu = require('os').cpus().length;

if(cluster.isMaster){
	console.log(cpu);
	cluster.fork();
	cluster.fork();

	cluster.on('online', function(worker){
		console.log("worker started pid	: "+worker.process.pid);
	});

	cluster.on('exit', function(worker,code,signal){
		console.log('worker '+worker.process.pid + 'stopped');
	});

}else{
	var express = require('express');
	var http = require('http');
	var app = express();

	app.get('/', function(req,res){
		console.log("request : "+cluster.worker.process.pid);
		res.send("welcome to node.js cluster api from "+cluster.worker.process.pid);
	});

	http.createServer(app).listen(5000);
}