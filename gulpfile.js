/*jshint node: true*/
"use strict";
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    ngHtml2Js = require('gulp-ng-html2js'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    inject = require('gulp-inject'),
    clean = require('gulp-clean'),
    karma = require('gulp-karma');

var targetDir = __dirname + '/target/';
var staticDir = targetDir + 'static/';
var vendorScripts = [
    'vendor/jquery/dist/jquery.js',
    'vendor/angular/angular.js',
    'vendor/angular-route/angular-route.js',
    'vendor/angular-resource/angular-resource.js',
    'vendor/angular-bootstrap/ui-bootstrap-tpls.js'
];
var scripts = 'src/**/*.js';
var karmaScripts = vendorScripts.concat(
    'vendor/angular-mocks/angular-mocks.js',
    scripts,
    'node_modules/jasmine-collection-matchers/lib/pack.js',
    'test/unit/**/*.js',
    staticDir+'templates.js'
);
var templates = 'src/**/*.tpl.html';

gulp.task('ng-template', function () {
    return gulp.src(templates)
        .pipe(ngHtml2Js({
            moduleName: "jacket.templates",
            prefix: "templates/",
            stripPrefix: "src"
        }))
        .pipe(concat("templates.js"))
        .pipe(gulp.dest(staticDir));
});

gulp.task('index', ['ng-template', 'vendor-js', 'js', 'styles'], function () {
    return gulp.src('src/index.html')
        .pipe(inject(
            gulp.src(vendorScripts.concat('css/*.*', 'js/**/*.*', 'templates.js'), {cwd: staticDir}),
            {addPrefix: '/static/'}
        ))
        .pipe(gulp.dest(targetDir));
});

gulp.task('vendor-js', function () {
    return gulp.src(vendorScripts, {base: './'}).pipe(gulp.dest(staticDir));
});

gulp.task('js', function () {
    return gulp.src(scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(gulp.dest(staticDir + 'js/'));
});

gulp.task('styles', function () {
    return gulp.src('src/less/styles.less')
        .pipe(less())
        .pipe(gulp.dest(staticDir + 'css/'));
});

gulp.task('assets', function () {
    return gulp.src(['src/+(assets)/**', 'vendor/bootstrap/dist/+(fonts)/**']).pipe(gulp.dest(staticDir));
});

gulp.task('test', ['ng-template'], function () {
    return gulp.src(karmaScripts)
        .pipe(karma({configFile: 'karma.conf.js'}));
});

gulp.task('test-server', ['ng-template'], function () {
    return gulp.src(karmaScripts)
        .pipe(karma({configFile: 'karma.conf.js', action: 'watch'}));
});

gulp.task('clean', function() {
    return gulp.src(targetDir+'**').pipe(clean());
});


gulp.task('watch', ['test-server'], function () {
    gulp.watch('src/index.html', ['index']);
    gulp.watch(templates, ['ng-template']);
    gulp.watch('src/less/**', ['styles']);
    gulp.watch(scripts, ['js']);
});

gulp.task('dev', ['build', 'watch']);

gulp.task('build', ['index', 'assets']);
gulp.task('default', ['build', 'test']);
