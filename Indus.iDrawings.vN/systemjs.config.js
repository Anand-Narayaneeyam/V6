/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs': 'node_modules/rxjs',
        'moment': 'node_modules/moment/moment.js',
        'ng2-dnd': 'app/Framework/ExternalLibraries/dnd',
        'd3': 'node_modules/d3/d3.js',
        'nvd3': 'node_modules/nvd3/build/nv.d3.js',
        'ng2-nvd3': 'node_modules/ng2-nvd3/build/lib/ng2-nvd3.js'
       // 'ng2-nvd3': 'node_modules/ng2-nvd3/lib/ng2-nvd3.ts'
        //'angular2-highcharts': 'node_modules/angular2-highcharts',
        //'highcharts': 'node_modules/highcharts'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'ng2-dnd': { defaultExtension: 'js' }
        //,
        //'d3': { defaultExtension: 'js' },
        //'nvd3': { defaultExtension: 'js' },
        //'ng2-nvd3': { format: 'cjs' }
        //highcharts: {
        //    main: './highcharts.js',
        //    defaultExtension: 'js'
        //},
        //'angular2-highcharts': {
        //    main: './index.js',
        //    defaultExtension: 'js'
        //}
    };
    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'router-deprecated',
      'upgrade',
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
