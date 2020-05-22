var gulp = require('gulp');
var gzip = require('gulp-gzip');

gulp.task('compress', function() {
  return gulp.src(['./dist/cs-sugestao-melhoria/*.*'])
             .pipe(gzip())
             .pipe(gulp.dest('./dist/cs-sugestao-melhoria'))
});
