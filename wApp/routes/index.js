
/*
 * Home page.
 */

exports.index = function(req, res){
	var title = 'Sign in';

	// 记录访问本页面的来源链接
	// req.session._loginReferrer = req.headers.referer;

	res.render('index', { title: title, isExist:''});
};