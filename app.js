var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views','./views/pages');
app.set('view engine','jade');
//app.use([path],function) 使用中间件
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port, function(){
	console.log('iMovie is started on port ' + port);
});

//添加路由
//index page
app.get('/', function(req,res){
	res.render('index', {
		title : 'iMovie 首页',
		movies: [
			{
				title: '变形金刚',
				_id: 1,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC'
			},
			{
				title: '变形金刚',
				_id: 2,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC'
			},
			{
				title: '变形金刚',
				_id: 3,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC'
			},
			{
				title: '变形金刚',
				_id: 4,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC'
			},
			{
				title: '变形金刚',
				_id: 5,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC'
			},
			{
				title: '变形金刚',
				_id: 6,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC'
			}
		]
	})
});

//detail page
app.get('/movie/:id', function(req,res){
	res.render('detail', {
		title : 'iMovie 详情页',
		movie: {
			director: '迈克尔·贝',
			country: '美国',
			title: '变形金刚',
			year: 2007,
			poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC',
			language: '英语',
			flash: '//static.youku.com/v20161213.0/v/swf/loader.swf',
			summary: '简介：“霸天虎”的先遣部队旋风和毒蝎袭击了美军位于卡塔尔的军事基地，与此同时，路障帮助他的搭档迷乱潜入了美国总统的座机空中一号，通过电脑获悉，要想找到威震天就必须找到维特维奇家族的那副眼镜，上面有威震天关于能量块的信息扫描，而它现在的拥有者萨姆·维特维奇（希安·拉博夫 饰）成为了“霸天虎”攻击的目标。萨姆是名高中生，学校里没有人相信他讲述的关于这副眼镜的历史，失望之余，萨姆把眼镜放到网上拍卖，然而从未引起买家的兴趣。这时父亲送了一辆破车给他，这辆车恰好就是“汽车人”大黄蜂的变形。大黄蜂帮助萨姆交上了漂亮的女朋友米凯拉（梅根·福克斯 饰），但很快就遭遇了“霸天虎”的袭击，擎天柱带着其他“汽车人”赶到，一场机器人大战由此拉开了序幕。'
		}
	})
});

//admin page
app.get('/admin/movie', function(req,res){
	res.render('admin', {
		title : 'iMovie 后台录入页',
		movie: {
			title: '',
			director: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
});

//list page
app.get('/admin/list', function(req,res){
	res.render('list', {
		title : 'iMovie 列表页',
		movies: [
			{
				_id: 1,
				director: '迈克尔·贝',
				country: '美国',
				title: '变形金刚',
				year: 2007,
				poster: 'http://r4.ykimg.com/05160000564ED6E067BC3C28CA0335FC',
				language: '英语',
			}
		]
	})
});