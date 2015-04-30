# Gulp Webpack Boilerplate

A starting point for new projects. This boilerplate uses gulp and webpack as a base.

## Usage

This boilerplte is still a work _in progress_ and not recommended for anything
beyond experimentation at this point.

### Installation

In the top level directory:

```
npm install
```

### Build

In the top level directory:

```
`npm bin`/gulp build
```

If you have gulp-cli installed globally, you do not need the npm bin path.

### Development

In the top level directory:

```
`npm bin`/gulp
```

This starts the webpack dev server on http://0.0.0.0:5000/.

### Testing

Tests are run by default during the build task. During development there is
a watch task which reruns tests when files change.

## License

Copyright (c) 2015 ebargtuo

MIT (http://www.opensource.org/licenses/mit-license.php)

## Attributions

Basic HTML template is based on ideas from the
[HTML5 boilerplate](https://github.com/h5bp/html5-boilerplate) project.

The test to verify built files in the distribution directories is adapted from
a
[similar test](https://github.com/h5bp/html5-boilerplate/blob/master/test/file_existence.js)
in the [HTML5 boilerplate](https://github.com/h5bp/html5-boilerplate) project.
