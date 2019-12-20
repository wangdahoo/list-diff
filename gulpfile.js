const gulp = require('gulp')
const browserify = require('browserify')
const tsify = require('tsify')
const source = require('vinyl-source-stream')
const fancy = require('fancy-log')
const exorcist = require('exorcist')
const tinyify = require('tinyify')
const bannerify = require('bannerify')

const defaultTarget = 'es5'

function build (target = defaultTarget) {
    return () => {
        const bundle = browserify({
            basedir: '.',
            debug: true,
            entries: 'src/index.ts',
            cache: {},
            packageCache: {},
            standalone: 'ListDiff'
        })
            .plugin(tsify, { target })
            .plugin(tinyify)
            .plugin(bannerify, {
                template: `/**
     * <%= pkg.name %>
     * @version <%= pkg.version %> | <%= moment().format('YYYY-MM-DD HH:mm:ss') %>
     * @author  <%= pkg.author %>
     * @license <%= pkg.license %>
     */
    `
            })
            .bundle()

        let dist = 'dist'
        if (target !== defaultTarget) {
            dist = `${dist}/${target}`
        }

        return bundle
            .pipe(exorcist(`${dist}/list-diff.js.map`))
            .on('error', fancy)
            .pipe(source('list-diff.js'))
            .pipe(gulp.dest(dist))
    }
}

gulp.task('build', gulp.series(build(), build('es6')))
