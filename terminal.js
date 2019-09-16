
	
	// global variables
	var his = new Array();
	var hislen = his.length;

	var html = {
		user:user,
		ln:"<p class=\"format1\"><span class=\"dir\">~</span>&nbsp;&nbsp;&#36;&nbsp;<input class=\"input\" type=\"text\" spellcheck=\"false\"></input></p>",
		encode:encode,
	}

	var command = {
		undefine:"command not found",
		unexist:"No such file or directory",
		me:"me",
		clear:"clear",
		cd:"cd",
		mkdir:"mkdir",
		touch:"touch",
		// ls:"ls",
		rm:"rm",
	}

	var dir = new Array(
		"",
		"home"
		);
	var file = new Array(
		"home/me"
	);
	var currentDir = "";

	function user() {
		return;
	}
	function encode (str) {
		var s="";
		if(str.length == 0) return "";
		s=str.replace(/&/g, "&amp;");
		s=s.replace(/</g, "&lt;");
		s=s.replace(/>/g, "&gt;");
		s=s.replace(/ /g, "&nbsp;");
		s=s.replace(/\'/g, "&#39;");
		s=s.replace(/\"/g, "&quot;");
		s=s.replace(/\$/g, "&#36;");
		return s;
	}
	function decode (str) {
		var s = "";
	  	if (str.length == 0 ) return "";
	  	s=str.replace(/&amp;/g, "&");
		s=s.replace(/&lt;/g, "<");
		s=s.replace(/&gt;/g, ">");
		s=s.replace(/&nbsp;/g, " ");
		s=s.replace(/&#39;/g, "\'");
		s=s.replace(/&quot;/g, "\"");
		s=s.replace(/&#36;/g, "$");
	  	return s;
	}
	
	// common functions
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
		return index;
	};

	function init () {
		currentDir="~";
		$('html').append("<span class=\"hide\"></span>");
	}
	function autofocus () {
		$('input.input:last').focus();
		$('.input').bind('blur',function () {
			$('input.input:last').focus();
		});
		$('span.dir:last').text(decode(currentDir));
		
		update();
	}
	function update() {
		$('input.input').each(function() {
			$(this).css("width", $(this).parent().width() - $(this).siblings('span').width() - 50);
		});
	}

	// execution command functions
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
	
	// keyback control functions
	var rebind = function () {
		$('.input').bind('keydown',function(e){
			exec.exec(exec.type(e));
			arrange(getKey(e));
		});
		$('body').append(decode(html.ln));
		$('.input').bind('keydown',function(e){
			exec.exec(exec.type(e));
			arrange(getKey(e));
		});
	}

	function getKey (e) {
		return e.keyCode;
	}
	function arrange(key) {
		switch (key)
		{
		case 38:
			if (hislen<=0) return;
			$('.input')[$('.input').length-1].value = decode(his[hislen-1]);
			hislen--;
			break;
		case 40:
			if (hislen>=his.length) return;
			$('.input')[$('.input').length-1].value = decode(his[hislen]);
			hislen++;
			break;
		case 13:
			$('.input').each(function() {
				$(this).attr("readonly","readonly");
			});
			ln();
			break;
		}
	}

	function ln() {
		rebind();
		autofocus();
	}

	$.fn.extend({
		terminal:function () {
			ln();
		}	
	});