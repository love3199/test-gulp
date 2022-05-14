let {src,dest,watch} = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

function fnIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist/index.html'));
}
function fnCSS(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
function fnJS(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
function fnhtml(){
    return src('./src/html/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/html'));
}
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
function fnLib(){
    return src('./src/lib/*')
    .pipe(dest('./dist/lib'));
}
function fnWatch(){
    watch('./src/index.html',fnIndex);
    watch('./src/html/*.html',fnhtml);
    watch('./src/img/*',fnImg);
    watch('./src/js/*.js',fnJS);
    watch('./src/lib/*',fnLib);
    watch('./src/sass/*.scss',fnCSS);


}

exports.index = fnIndex;
exports.css = fnCSS;
exports.js = fnJS;
exports.img = fnImg;
exports.html = fnhtml;
exports.lib = fnLib;
exports.default = fnWatch;