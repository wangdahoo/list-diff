const gulp = require('gulp')
const browserify = require('browserify')
const tsify = require('tsify')
const source = require('vinyl-source-stream')
const fancy = require('fancy-log')
const exorcist = require('exorcist')
const tinyify = require('tinyify')

function build () {
    const bundle = browserify({
        basedir: '.',
        debug: true,
        entries: 'src/index.ts',
        cache: {},
        packageCache: {},
        standalone: 'ListDiff'
    })
        .plugin(tsify)
        .plugin(tinyify)
        .bundle()

    return bundle
        .pipe(exorcist('dist/list-diff.js.map'))
        .on('error', fancy)
        .pipe(source('list-diff.js'))
        .pipe(gulp.dest('dist'))
}

gulp.task('build', gulp.series(build))
