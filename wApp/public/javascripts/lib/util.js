var util = (function() {

	var alertMsgTemplate = function(id, state, msg) {
		var html = '';
		html += '<div id="'+id+'" class="ui-alertMsg">';
		html += '<div class="ui-msg-'+state+'">';
		html += '<p>'+msg+'</p>';
		html += '</div>';
		html += '</div>';
		return html;
	}

	return {
		// 页面顶部的提示信息框
		alertMsg:function(J_hook, options) {
			var loader = this;
			var _hook = $(J_hook);
			var html = alertMsgTemplate(options.id, options.state, options.msg);
			// code body
			_hook.append(html);
			var _msg = $('#'+options.id);
			this.setCenter(_hook, _msg);
			var dom = this.createDomAppend(_hook, _msg);
			setTimeout(function() {
				dom.attr('class','ui-animation');
			},100);
		},

		// 居中设置
		setCenter:function(father, child) {
			var _f = $(father);
			var _c = $(child);
			var f_width = _f.width();
			var c_width = _c.width();
			// code body
			_c.offset({
				left: f_width/2 - c_width/2
			});
		},

		createDomAppend:function(father, child) {
			var dom = document.createElement('div');
			father.append(dom);
			$(dom).append(child);
			return $(dom);
		}

	}
})();