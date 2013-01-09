
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config/config').config
  , _pageIndex = require('./routes')
  , _pageSign = require('./routes/sign')
  , _pageUser = require('./routes/user')
  , _pageManage = require('./routes/manage')
  , _pageDepart = require('./routes/department')
  , _pageTemplate = require('./routes/createTemplate')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret:config.session_secret
  }));
  app.use(_pageSign.auth_user);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * routes
 */
app.get('/', _pageIndex.index);
// sign
app.get('/sign/signin', _pageSign.signin);
app.get('/sign/signup', _pageSign.signup);
app.get('/sign/signout', _pageSign.signout);
app.post('/sign/session', _pageSign.session);
// user
app.post('/user/createAccount', _pageUser.createAccount);
app.get('/user/setting', _pageUser.setting);
app.post('/user/setting', _pageUser.modifySetting);
app.get('/createTemplate', _pageTemplate.list);
// manage
app.get('/manage', _pageManage.index);
// department
app.get('/department/list', _pageDepart.list);
app.get('/department/add', _pageDepart.add);
app.post('/department/add', _pageDepart.addSetting);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
