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