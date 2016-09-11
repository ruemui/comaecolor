var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var fs = require('fs');
var runSequence = require('run-sequence');

var PATH_SRC = 'src';
var PATH_CODE = 'code';
var PATH_STYLEGUIDE = 'styleguide';
var PATH_STYLEGUIDE_INCLUDES = [
	PATH_CODE +'/asset/css/normalize.css',
	PATH_CODE +'/asset/css/main.css',
	PATH_CODE +'/asset/css/print.css'
];

// コードとスタイルガイドの生成
gulp.task('build:html', function () {
	return gulp.src(PATH_SRC +'/**/*.{html,php}')
		.pipe($.plumber())
		.pipe(gulp.dest(PATH_CODE));
});
gulp.task('build:image', function () {
	return gulp.src([PATH_SRC +'/**/*.{png,jpg}', !PATH_SRC + '/asset/image/sprite'])
		.pipe($.plumber())
		.pipe($.imagemin())
		.pipe(gulp.dest(PATH_CODE));
});
gulp.task('build:css', function () {
	return gulp.src(PATH_SRC +'/asset/css/**/*.{css,scss}')
		.pipe($.plumber())
		.pipe($.sass({
			indentType: 'tab',
			indentWidth: 1,
			outputStyle: 'expanded'
		}))
		.pipe($.autoprefixer({
			browsers: [
				'Explorer >= 9',
				'Firefox >= 46',
				'Chrome >= 50',
				'Safari >= 9',
				'Android >= 4.2',
				'iOS >= 8'
			],
			cascade: false
		}))
		.pipe($.replace(/(^[ \t]*)\/\*[^]*?\*\//gm, '$1')) // コメント行の削除
		.pipe($.replace(/^[ \t]*\n/gm, '')) // 空行の圧縮
		.pipe(gulp.dest(PATH_CODE +'/asset/css'));
});
gulp.task('build:js', function () {
	return gulp.src(PATH_SRC +'/**/*.js')
		.pipe($.plumber())
		.pipe($.replace(/(^[ \t]*)\/\*[^]*?\*\//gm, '$1')) // コメント行の削除
		.pipe($.replace(/^[ \t]*\n/gm, '')) // 空行の圧縮
		.pipe(gulp.dest(PATH_CODE));
});
gulp.task('build:styleguide', function () {
	if ((function () {  // includesが生成されていれば、スタイルガイドを生成
		for (var i = 0; i < PATH_STYLEGUIDE_INCLUDES.length; ++ i) {
			if (!fs.existsSync(PATH_STYLEGUIDE_INCLUDES[i])) {
				return false;
			}
		}
		return true;
	})()) {
		gulp.src(PATH_SRC +'/asset/css/**/*')
			.pipe($.plumber())
			.pipe($.styledocco({
				out: PATH_STYLEGUIDE,
				name: 'StyleGuide',
				include: PATH_STYLEGUIDE_INCLUDES
			}));
	}
});
gulp.task('build', function (callback) {
	runSequence(['build:html', 'build:image', 'build:css', 'build:js'], 'build:styleguide', callback);
});

// ファイル変更の監視
gulp.task('watch', function () {
	gulp.watch(PATH_SRC +'/**/*.{html,php}',           function () { gulp.start('build:html'); });
	gulp.watch(PATH_SRC +'/**/*.{png,jpg}',            function () { gulp.start('build:image'); });
	gulp.watch(PATH_SRC +'/asset/css/**/*.{css,scss}', function () { gulp.start('build:css'); });
	gulp.watch(PATH_SRC +'/asset/**/*.js',             function () { gulp.start('build:js'); });
	gulp.watch(PATH_SRC +'/asset/css/**/*.{css,scss}', function () { gulp.start('build:styleguide'); });
});

// 生成物の削除
gulp.task('clean:code', function (callback) {
	del([PATH_CODE], callback);
});
gulp.task('clean:styleguide', function (callback) {
	del([PATH_STYLEGUIDE], callback);
});

gulp.task('clean', ['clean:code', 'clean:styleguide']);

// デフォルトのタスク
gulp.task('default', ['build', 'watch']);
