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

$(function () {
	init();
	autofocus();
});

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

