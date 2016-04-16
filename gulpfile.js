var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
// var ts = require('gulp-typescript');
// var Server = require('karma').Server;

gulp.task('sass', function(){
	gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

gulp.task('jade', function(){
	gulp.src('src/jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('.'));
});

// gulp.task('typescript', function(){
// 	gulp.src('src/typescript/*.ts')
// 		.pipe(ts({
// 			noImplicitAny: true,
// 			out: 'MorseCodeReader.js'
// 		}))
// 		.pipe(gulp.dest('js'));
// });

// gulp.task('test', function (done) {
// 	new Server({
// 		configFile: __dirname + '/karma.conf.js',
// 		singleRun: true
// 	}, done).start();
// });

gulp.task('default', function(){
	gulp.watch('src/jade/*.jade', ['jade']);
	gulp.watch('src/sass/*.sass', ['sass']);
	// gulp.watch('src/typescript/*.ts', ['typescript']);
});