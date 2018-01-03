const webpackConfig = require('../webpack.conf')
const environment = require('../env')

var env = environment.env
var src = environment.src
var dest = environment.dest

var config = {
  env: env,
  src: src,
  dest: dest,

  autoprefixer: {
    browsers: ['last 2 versions']
  },

  blog: {
    articlesPerPage: 10,
    blogDir: 'blog',
    date: {
      fileDateFormat: 'YYYY-MM-DD',
      outputDateFormat: 'Do MMMM, YYYY'
    },
    globalData: './data/featured-communities.json',
    markdownOptions: {
      smartypants: true,
      gfm: true,
      // Highlights code with highlight.js
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
      }
    },
    postSrc: src + '/posts/*.{md,nj,nunjucks}',
    postDest: dest + '/blog',
    summaryMarker: '<!--more-->',
    pageSrc: src + '/pages/**/*.{nj,nunjucks,php}',
    pageDest: dest,
    tags: {
      basename: '/tags'
    },
    watch: [
      src + '/pages/**/*',
      src + '/templates/**/*',
      'data/**/*.json'
    ],
    regenerateArchives: false
  },

  browserSync: {
    server: {
      baseDir: dest
    },
    host: 'localhost',
    port: 3000,
    open: false,
    notify: false
  },

  deploy: {
    method: 'ghpages' // rsync, aws or ghpages
    // Deploys to another git repo
    // opts: {
    //   remoteUrl: 'git@github.com:zellwk/test-project.git',
    // }
  },

  fonts: {
    src: src + '/fonts/**/*',
    dest: dest + '/fonts'
  },

  images: {
    src: [
      src + '/assets/**/**/*.{png,jpeg,jpg,gif,svg,json,pdf,php}',
      '!' + src + '/img/sprites/*'
    ],
    dest: dest + '/assets',
    opts: {
      interlaced: true,
      optimizationLevel: 5,
      progressive: true
    }
  },

  sass: {
    src: src + '/assets/scss/**/*.{scss,sass}',
    dest: dest + '/assets/css',
    opts: {
      includePaths: [
        src + '/bower_components',
        './node_modules'
      ]
    }
  },

  scsslint: {
    src: [
      src + 'assets/scss/**/*.scss',
      // Don't lint SCSS files because it's generated
      '!' + src + '/scss/_sprites.scss'
    ]
  },

  sprites: {
    src: src + '/assets/img/sprites/*',
    dest: src + '/scss',
    opts: {
      padding: 2,
      cssName: '_sprites.scss',
      imgName: 'sprites.png',
      imgPath: '../assets/img/sprites.png',
      retinaSrcFilter: src + '/assets/img/sprites/*@2x.{png,jpg,jpeg}',
      retinaImgName: 'sprites@2x.png',
      retinaImgPath: '../assets/img/sprites@2x.png'
    }
  },

  svg: {
    src: src + '/assets/img/svg/**/*',
    dest: dest,
    opts: {
      mode: {
        symbol: true
      }
    }
  },

  webpack: Object.assign(webpackConfig, {
    src: src + '/assets/js/main.js',
    dest: dest + '/assets/js'
  }),

  useref: {
    src: dest + '/**/*.html',
    dest: dest,
    manifest: dest,
    opts: {
      searchPath: env === 'prod' ? dest : src
    }
  },

  uncss: {
    ignore: [
      /.is-/,
      /.has-/,
      /.hljs-/
    ]
  }
}

module.exports = config
