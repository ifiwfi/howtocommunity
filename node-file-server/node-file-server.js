/*
Below is the example how to create a node file server that will serve the requested file.
Right now it is serving only html, jpg and png files.
*/

/*
including http module which is having necessary functions, objects and event handlers for creating an http server and to tackle a complete request response cycle.
*/
var http = require("http");
/*
including url module which is having necessary functions to play with URLs like to parse URL and much more
*/
var url = require('url');
/*
including url module which is having necessary functions for file handling.
*/
var fs = require('fs');
/*
creating http server passing a callback function as argument.
*/
var server = http.createServer(function(request, response){
	
	/*
	because we want our node file server to search for the requested files in the 'files' directory.
	*/
	var resource_storage = 'files/';
	/*
	getting the requested file name. Remember, this is not giving us the whole URL.
	*/
	var requested_file_name = url.parse(request.url).pathname;
	/*
	simply concatenating the requested file name with resources storage to create a path like "files/about.html"
	*/
	resource_storage += requested_file_name;
	/*
	checking if the current page is "http://localhost:8125". Because on this page there will be no files name specified in the URL and we have to take care of it.
	*/
	if( requested_file_name == '/' )
		resource_storage += 'home.html';
	/*
	reading the file. This function is taking two arguments.
	1: The path of the file which has to be read.
	2: A callback function which will be executed after the reading of file. The callback function is taking two arguments, first is error which will be having complete detail of error if the file wasn't found or some other problem occurred and second is the data which will be having the contents of file.
	*/
	fs.readFile(resource_storage, function(error, data){
		/*
		checking if the error object is having something in it. If it has, we are simply setting the status code 404 that file not found and ending the response giving this message.
		*/
		if (error){
			response.writeHead(404);
			response.end("opps this file doesn't exist - 404");
		}
		else{
			/*
			getting extension of the requested file name
			*/
			var file_extension = resource_storage.split('.').pop();
			/*
			setting content type on the basis of extension of the requested file name
			*/
			if(file_extension == 'html')
				var content_type = 'text/html';
			else if(file_extension == 'jpg' || file_extension == 'png')
				var content_type = 'image/'+ file_extension +' ';
			/*
			setting status code and content_type of the response to give
			*/
			response.writeHead(200, {"Content-Type": content_type});
			/*
			giving the data or contents of file and setting the encoding scheme also.
			*/
			response.end(data, 'utf-8');
		}
	});
});
/*
starting the server on a port.
*/
server.listen(8125);
/*
giving an output to console
*/
console.log('Your node file server is running');