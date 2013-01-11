exports.db = {
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'test'
};

exports.config = {
	session_secret: 'alipay',
	auth_cookie_name: 'alipay'
};

// 缺陷类型配置
exports.bugType = {
	// 前端编码问题
	fontCodeErr:{
		msg:'前端编码问题',
		val:'fontCodeErr',
		reason:{
			domStructErr:'DOM结构问题',
			cssPropertyErr:'CSS属性定义有误',
			cssCompatibleErr:'CSS兼容性问题',
			jsCompatibleErr:'JS兼容性问题',
			jsPerformErr:'JS性能问题',
			hardCodeErr:'硬编码错误',
			spellErr:'拼写错误',
			jsLogicErr:'JS逻辑错误',
			vmCodeErr:'VM编码问题'
		}
	},
	// 前端配置问题
	fontConfErr:{
		msg:'前端配置问题',
		val:'fontConfErr',
		reason:{
			cmsConfErr:'CMS配置部署问题',
			staticFileErr:'静态文件发布问题',
			serverConfErr:'服务器配置问题'
		}
	},
	// 合并冲突
	combineErr:{
		msg:'合并冲突',
		val:'combineErr',
		reason:{
			combineErr:'合并冲突'
		}
	},
	// 需求问题
	requireErr:{
		msg:'需求问题',
		val:'requireErr',
		reason:{
			analysisErr:'分析不足',
			uiErr:'交互问题',
			requireMissErr:'需求缺失'
		}
	}

};