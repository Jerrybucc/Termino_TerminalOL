var exec = {
	type:type,
	exec:exec
}

function type (e) {
	return e.keyCode;
}

function exec (key) {
	if (key!=13) return;
	dict(html.encode($.trim($('input.input:last').val())));
}

function dict (str) {
	if (str=="") return;
	var keyName = str.substring(0,str.indexOf("&nbsp;")>=0?str.indexOf("&nbsp;"):str.length);
	var options = opts(str,options);
	switch (keyName)
	{
	case command.me:
		result("",me());
		break;
	case command.clear:
		clear();
		break;
	case command.cd:
		result(keyName, cd(options));
		break;
	case command.mkdir:
		result(keyName, mkdir(options));
		break;
	case command.touch:
		result(keyName, touch(options));
		break;	
	// case command.ls:
	// 	result(keyName, ls(options));
	// 	break;
	case command.rm:
		result(keyName, rm(options));
		break;
	default:
		result(keyName,command.undefine);
		break;
	}
	his.push(str+"");
	hislen = his.length;
}

function opts(str, options) {
	if (options==null) options = new Array();
	if (str.indexOf("&nbsp;")>=0) {
		var sub = str.substring(str.indexOf("&nbsp;")+6);
		options.push(sub);
		return opts(sub,options);
	} else{
		var result = new Array();
		for (var i = 0; i < options.length-1; i++) {
			result.push(options[i].substring(0,options[i].indexOf(options[i+1])-6));
		};
		result.push(options[options.length-1]);
		return result;
	}
}
function result (key, notice) {
	var body = $('body');
	var format2 = "<p class=\"format2\">";
	notice = notice==""||notice==null?"":key==""||key==null?format2+notice:key+": "+notice;
	body.append(decode(notice));
}

// commands
function me () {
	window.location.href = "http://jerrybucc.github.io";
	return null;
}

function clear () {
	$('body').text("");
}

function cd (options) {
	if (options==""||options==null){
		currentDir="~";
		return;
	}
	if (options.length==1&&options[0]=="/"){
		currentDir="/";
		return;
	}
	for (var i = 0; i < options.length; i++) {
		for (var j = 0; j < dir.length; j++) {
			if (currentDir+"\/"+options[i]=="~\/"+dir[j]){
				currentDir="~\/"+dir[j];
				options.shift();
			}
		};
	};
	if (options.length>=1) return command.unexist;
	return;
}

function mkdir (options) {
	if (options==""||options==null) return "missing operand";
	if (currentDir=="/") return "Permission denied";
	var notice;
	for (var i = 0; i < options.length; i++) {
		for (var j = 0; j < dir.length; j++) {
			notice = options[i];
			if (currentDir+"\/"+options[i]=="~\/"+dir[j]){
				return "cannot create directory \'"+notice+"\': File exists";
			}
		}
		dir.push(currentDir.substring(2)==""?options[i]:currentDir.substring(2)+"\/"+options[i]);
		options.shift();
	}
	return;
}

function touch (options) {
	if (options==""||options==null) return "missing file operand";
	if (currentDir=="/") return "Permission denied";
	for (var i = 0; i < options.length; i++) {
		for (var j = 0; j < file.length; j++) {
			if (currentDir+"\/"+options[i]=="~\/"+file[j]){
				return;
			}
		}
		file.push(currentDir.substring(2)==""?options[i]:currentDir.substring(2)+"\/"+options[i]);
		options.shift();
	}
	return;
}

// function ls (options) {
// 	var match = currentDir.substring(0,1)=="~"?currentDir.substring(2):null;
// 	if (match==null) return;
// 	for (var i = 0; i < dir.length; i++) {
// 		if (match==dir[i]){
// 			for (var j = 0; j < dir.length; j++) {
// 				var index = dir[i].indexOf(dir[j]);
// 				var sub = dir[i].substring(index+dir[j].length);
// 				return sub.substring(0, sub.indexOf("\/")==-1?sub.length:sub.indexOf("\/"));
// 			};
// 			// return dir[i];
// 		}
// 	};
// }

function rm (options) {
	if (currentDir=="/") return "Permission denied";
	var recursive = false;
	for (var i = 0; i < options.length; i++) {
		if(options[i]=="-r"||options[i]=="-R"||options[i]=="--recursive"){
			recursive = true;
			options.remove(options[i]);
		}
	};
	if (options==""||options==null) return "missing operand";
	for (var i = 0; i < options.length; i++) {
		if (recursive) {
			var back = dir.remove(options[i]);
			if (back ==-1) return "cannot remove "+options[i]+": No such file or directory";
		}else{
			var back = file.remove(options[i]);
			if (back ==-1) return "cannot remove "+options[i]+": No such file or directory, Or Is a directory";
		};
	};

	return;
}