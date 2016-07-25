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
$(function () {
	ln();
});

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