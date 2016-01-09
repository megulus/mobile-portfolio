var gulp = require('gulp'), // import node package
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    prefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    im = require('gulp-gm'),
    critical = require('critical');
    //imageResize = require('gulp-image-resize');

// This file is very verbose/repetitive right now - TODO: learn more about writing efficient gulpfiles

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// html task
// minifies
gulp.task('html', function() {
    // main html
    gulp.src('build/*.html')
        .pipe(minifyhtml({collapseWhitespace: true}))
        .on('error', errorLog)
        .pipe(gulp.dest('build'));
    // views html
    gulp.src('build/views/*.html')
        .pipe(minifyhtml({collapseWhitespace: true}))
        .on('error', errorLog)
        .pipe(gulp.dest('build/views'))
        .pipe(notify({message: "HTML minified!"}));
});


// scripts task
// uglifies
gulp.task('scripts', function() {
    // main js
    gulp.src('js/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'));
    // views js
    gulp.src('views/js/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/views/js'))
        .pipe(notify({message: "JavaScript uglified!"}));
});



// generate and inline critical-path CSS
// annoyingly, src for this task cannot take an array, so must be done separately for all my html files!
gulp.task('critical-index', function() {
    critical.generate({
        inline: true,
        base: '/Users/megdahlgren/src/nanodegree/mobile-portfolio',
        src: 'index.html',
        css: 'css/style.css',
        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 480,
            height: 320
        }, {
            width: 768,
            height: 1024
        },{
            width: 1224,
            height: 960
        }],
        dest: 'build/index.html',
        minify: false,
        extract: false
    });
});

gulp.task('critical-2048', function() {
    critical.generate({
        inline: true,
        base: '/Users/megdahlgren/src/nanodegree/mobile-portfolio',
        src: 'project-2048.html',
        css: 'css/style.css',
        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 480,
            height: 320
        }, {
            width: 768,
            height: 1024
        },{
            width: 1224,
            height: 960
        }],
        dest: 'build/project-2048.html',
        minify: true,
        extract: false
    });
});

gulp.task('critical-mobile', function() {
    critical.generate({
        inline: true,
        base: '/Users/megdahlgren/src/nanodegree/mobile-portfolio',
        src: 'project-mobile.html',
        css: 'css/style.css',
        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 480,
            height: 320
        }, {
            width: 768,
            height: 1024
        },{
            width: 1224,
            height: 960
        }],
        dest: 'build/project-mobile.html',
        minify: true,
        extract: false
    });
});

gulp.task('critical-webperf', function() {
    critical.generate({
        inline: true,
        base: '/Users/megdahlgren/src/nanodegree/mobile-portfolio',
        src: 'project-webperf.html',
        css: 'css/style.css',
        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 480,
            height: 320
        }, {
            width: 768,
            height: 1024
        },{
            width: 1224,
            height: 960
        }],
        dest: 'build/project-webperf.html',
        minify: true,
        extract: false
    });
});

gulp.task('critical-pizza', function() {
    critical.generate({
        inline: true,
        base: '/Users/megdahlgren/src/nanodegree/mobile-portfolio',
        src: 'views/pizza.html',
        css: ['views/css/style.css', 'views/css/bootstrap-grid.css'],
        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 480,
            height: 320
        }, {
            width: 768,
            height: 1024
        },{
            width: 1224,
            height: 960
        }],
        dest: 'build/views/pizza.html',
        minify: true,
        extract: false
    });
});



// styles task - no longer necessary?
// prefixes (last 2 versions), minifies
gulp.task('styles', function() {
    // main css
    gulp.src('css/*.css')
        .pipe(prefixer('last 2 versions'))
        .pipe(minifycss())
        .on('error', errorLog)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
    // views css
    gulp.src('views/css/*.css')
        .pipe(prefixer('last 2 versions'))
        .pipe(minifycss())
        .on('error', errorLog)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/views/css'))
        .pipe(notify({message: "CSS prefixed and minified!"}));
});

// image resize task
// resizes larger images (before compressing them)
gulp.task('resizeimages', function() {
    gulp.src('img/2048.png')
        .pipe(im(function (gmfile) {
            return gmfile.resize(100, 147);
        }, {
            imageMagick: true
        }))
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest('img'));
    gulp.src('views/images/pizzeria.jpg')
        .pipe(im(function (gmfile) {
            return gmfile.resize(150, 86);
        }, {
            imageMagick: true
        }))
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest('views/images'));
    gulp.src('views/images/pizza.png')
        .pipe(im(function (gmfile) {
            return gmfile.resize(70, 70);
        }, {
            imageMagick: true
        }))
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest('views/images'));
    gulp.src('img/cam_be_like.jpg')
        .pipe(im(function (gmfile) {
            return gmfile.resize(100, 102);
        }, {
            imageMagick: true
        }))
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest('img'));
    gulp.src('img/mobilewebdev.jpg')
        .pipe(im(function (gmfile) {
            return gmfile.resize(150, 51);
        }, {
            imageMagick: true
        }))
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest('img'));
    gulp.src('img/FEND_P4.jpg')
        .pipe(im(function (gmfile) {
            return gmfile.resize(70, 70);
        }, {
            imageMagick: true
        }))
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest('img'));
});

// image optimization task
// compress images
gulp.task('compressimages', function() {
    gulp.src('img/*-small.jpg')
        .pipe(imagemin({progressive: true}))
        .pipe(rename({suffix: '-compressed'}))
        .pipe(gulp.dest('build/img'));
    gulp.src('views/images/*-small.jpg')
        .pipe(imagemin({progressive: true}))
        .pipe(rename({suffix: '-compressed'}))
        .pipe(gulp.dest('build/views/images'));
    gulp.src('img/*-small.png')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(rename({suffix: '-compressed'}))
        .pipe(gulp.dest('build/img'));
    gulp.src('views/images/*-small.png')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(rename({suffix: '-compressed'}))
        .pipe(gulp.dest('build/views/images'));
});



// watch task
// watches js
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
});


gulp.task('default', ['scripts', 'styles', 'critical-index', 'critical-2048', 'critical-mobile', 'critical-webperf', 'critical-pizza', 'html', 'resizeimages', 'compressimages']);

