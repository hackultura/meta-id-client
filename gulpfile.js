var gulp = require('gulp');
var rename = require('gulp-rename');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var webserver = require('gulp-webserver');
var image = require('gulp-image');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');


var paths = {
	root: '.',
	src: './src',
	app: {
		root: './src/app',
		js: './src/app/**/*.js',
		html: './src/app/**/*.html'
	},
	public: {
		index: "./src/public/index.html",
		html: "./src/public/*.html",
		pages: "./src/public/pages/**/*.html",
		less: {
			root: "src/public/build/less/",
			skins: "src/public/build/less/skins/*.less",
			all: ["src/public/build/less/AdminLTE.less", "src/public/build/less/skins/skin-green-light.less"]
		},
		js: {
			app: "src/public/build/js/app.js",
			all: ["src/public/build/js/app.js"]
		},
		img: {
			root: "./src/public/build/img",
			images: "./src/public/build/img/**/*",
		},
		fonts: {
			ionicons: "./src/public/vendors/Ionicons/fonts/**/*",
			bootstrap: "./src/public/vendors/bootstrap/fonts/**/*"
		}
	},
	dist: {
		root: './src/public/dist',
		app: {
			root: './src/public/dist/app',
			html: './src/public/dist/app/html',
		},
		public: {
			pages: "./src/public/dist/pages",
			css: './src/public/dist/css',
			js: './src/public/dist/js',
			img: './src/public/dist/img',
			fonts: './src/public/dist/fonts'
		}
	}
};

/**
 * removes css- and js-dist folder.
 */
gulp.task('clean', function() {
	rimraf.sync(paths.dist.root);
});

gulp.task('usemin', ['less', 'uglify:layout'], function () {
  return gulp.src('./src/public/index.html')
      .pipe(usemin({
        css: [minifyCSS({rebase: false}), 'concat', rev()],
        layout_css: [minifyCSS(), 'concat', rev()],
        vendor_css: [minifyCSS(), 'concat', rev()],
        layout_js: [uglify(), rev()],
        lib: [uglify(), rev()],
        app: [uglify(), rev()]
      }))
      .pipe(gulp.dest(paths.dist.root));
});

gulp.task('usemin:fonts', function() {
	return gulp.src([paths.public.fonts.ionicons, paths.public.fonts.bootstrap])
		.pipe(gulp.dest(paths.dist.public.fonts));
});

gulp.task('imagemin', function() {
    return gulp.src(paths.public.img.images)
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(paths.dist.public.img));
});

gulp.task('html', function () {
  return gulp.src(paths.app.html)
	.pipe(templateCache({
		module: 'metaIdApp'
	}))
    .pipe(gulp.dest(paths.dist.app.html));
});

gulp.task('html:pages', function() {
	return gulp.src(paths.public.pages)
		.pipe(gulp.dest(paths.dist.public.pages));
});

gulp.task('watch', function () {
  gulp.watch([paths.app.js, paths.app.html, paths.public.html, paths.public.pages, paths.public.index, paths.public.less.all], ['clean', 'less', 'usemin', 'usemin:fonts', 'imagemin', 'html', 'html:pages']);
});

gulp.task('less', function () {
  return gulp
	.src(paths.public.less.all)
	.pipe(less())
	.pipe(gulp.dest('src/public/dist/css'));
});

gulp.task('uglify:layout', function () {
  return gulp
    .src(paths.public.js.all)
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/public/dist/js'));
});

gulp.task('uglify:app', function () {
  return gulp
    .src(paths.app.js)
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.app));
});

gulp.task('jshint', function () {
  return gulp
    .src('dist/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
  ;
});

gulp.task('webserver', function() {
  gulp.src(paths.dist.root)
    .pipe(webserver());
});

gulp.task('build', ['clean', 'less', 'usemin', 'usemin:fonts', 'imagemin', 'html', 'html:pages']);

gulp.task('default', ['build']);
