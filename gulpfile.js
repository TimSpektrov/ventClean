const { src, dest, series, watch} = require('gulp')
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const notify = require("gulp-notify");
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create()

let prod = false
const isProd = (done) => {
    prod = true;
    done();
}
const clean = () => {
    return del('dist')
}

const resources = () => {
    return src('src/source/**')
        .pipe(dest('dist'))
}

const styles = () => {
    return src('src/styles/styles.sass')
        .pipe(gulpIf(!prod,sourcemaps.init()))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulpIf(prod,autoprefixer({
            cascade: false,
        })))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulpIf(!prod,sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}
const htmlMinify = () => {
    return src ('src/index.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpIf(prod, htmlMin({
            collapseWhitespace: true,
        })))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src ('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite:'../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/**/*.js',
        'src/js/main.js',
    ])
        .pipe(gulpIf(!prod,sourcemaps.init()))
        .pipe(gulpIf(prod,babel({
            presets: ['@babel/env']
        })))
        .pipe(concat('app.js'))
        .pipe(gulpIf(prod,uglify(
            {toplevel: true,}
        ).on('error', notify.onError())))
        .pipe(gulpIf(!prod,sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    })
}

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.jpeg',
        'src/images/**/*.png',
        'src/images/*.svg',
    ])
        .pipe(image())
        .pipe(dest('dist/images'))
}

watch('src/**/*.html', htmlMinify)
watch('src/**/*.sass', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/images/**', images)
watch('src/js/**/*.js', scripts)
watch('src/source/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify

exports.dev = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)
exports.prod = series(isProd, clean, resources, htmlMinify, scripts, styles, images, svgSprites)

exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)

