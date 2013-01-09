$(document).ready(function() {
	var _state = '';
	var _msg = '';
	if($('#J_formAction')) {
		switch($('#J_formAction').val()) {
			case 'exist' :
				_state = 'fail';
				_msg = '已经存在此部门!';
				break;
			case 'success':
				_state = 'success';
				_msg = '新增成功!';
				break;
			case 'fail':
				_state = 'fail';
				_msg = '发生错误，修改失败!';
				break;
			default:
				break;
		}	
	}
	if(_state) {
		util.alertMsg('body',{
			id: 'J_topAlertMsg',
			state: _state,
			msg: _msg
		});
	}
});