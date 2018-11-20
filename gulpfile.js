#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const browserConfig = require('./webpack.config')[0];
const serverConfig = require('./webpack.config')[1];
const exec = require('child_process').exec;
const clientCompiler = compile(browserConfig);
const serverCompiler = compile(serverConfig);
const gulp = require('gulp');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();


gulp.task('client',function(cb){
  var started = false;
  clientCompiler.watch({
    quiet: true,
    ignored: ['public', 'node_modules'],
  }, (err, stats) => {
    if (!started) {
			cb();
			started = true; 
		} 
  })
})

gulp.task('server', function(cb){
  var started = false;
  serverCompiler.watch({
    quiet: true,
    ignored: ['public', 'node_modules', '*.*'],
  }, (err, stats) => {
    if (!started) {
			cb();
			started = true; 
		} 
  })
})

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
    script: './server.js',
    watch: ['server.js'],
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: 'http://localhost:3000', 
    // open: false,
    // notify: false,
    reloadDebounce: 500,
    port: 8080 //这个是browserSync对express实现的代理端口
  });
  gulp.watch('public/*.*').on('change', function(){
    console.log('reload')
    browserSync.reload()
  }
  );
})


gulp.task('dev', function(){
  runSequence( 'client', 'server','nodemon', 'browser-sync')
})

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    debugger
    console.log('error')
    process.exit(1);
  }
  return compiler;
}