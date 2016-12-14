var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/iMovie');

app.set('views','./views/pages');
app.set('view engine','jade');
//app.use([path],function) 使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.locals.moment = require('moment');
app.listen(port, function(){
	console.log('iMovie is started on port ' + port);
});

//添加路由
//index page
app.get('/', function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index', {
			title : 'iMovie 首页',
			movies: movies
		})
	})
});

//detail page
app.get('/movie/:id', function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err);
		}
		res.render('detail', {
			title : 'iMovie ' + movie.title,
			movie: movie
		})
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

//admin update movie
app.get('/admin/update/:id', function(req,res){
	var id = req.params.id;
	Movie.findById(id, function(err,movie){
		if(err) console.log(err);
		res.render('admin', {
			title: 'iMovie 后台更新页',
			movie: movie
		})
	})
})

//admin post movie
app.post('/admin/movie/new', function(req,res){
	var movieObj = req.body.movie;
	var id = movieObj._id;
	var _movie;

	if(id !== 'undefined'){
		Movie.findById(id,function(err,movie){
			if(err) console.log(err);
			_movie = _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err) console.log(err);
				res.redirect('/movie/' + movie._id);
			})
		})
	}
	else{
		_movie = new Movie({
			director: movieObj.director,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			summary: movieObj.summary,
			flash: movieObj.flash,
			poster: movieObj.poster,
		});
		_movie.save(function(err,movie){
			if(err) console.log(err);
			res.redirect('/movie/' + movie._id);
		})
	}

})

//list page
app.get('/admin/list', function(req,res){
	Movie.fetch(function(err,movies){
		if(err) console.log(err);
		res.render('list', {
			title : 'iMovie 列表页',
			movies: movies
		})
	})
});