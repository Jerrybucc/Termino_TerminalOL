var scripts = [
	'jquery',
	'var',
	'default',
	'exec',
	'keyback'
];

document.write('<head><link rel="stylesheet" type="text/css" href="./Stylesheets/default.css"/>');

for (i = 0; i < scripts.length; i++) { 
	document.write('<script type="text/javascript" src="./app/'+scripts[i]+'.js"></script>');
}

document.write('<title>Terminal</title></head><body></body>');