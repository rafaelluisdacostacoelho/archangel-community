declare var System: any;
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    let map = {
        'application': 'dist',
        '@angular': 'node_modules/@angular',
        '@angular2-material': 'node_modules/@angular2-material',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs': 'node_modules/rxjs',
        'angular2-jwt': 'node_modules/angular2-jwt/angular2-jwt.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    let packages = {
        'application': { main: 'bootstrap.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'angular2-jwt': { defaultExtension: 'js' },
        '@angular': { defaultExtension: 'js' },
        '@angular2-material': { defaultExtension: 'js' }
    };

    let ng2Packages = ['common', 'compiler', 'core', 'forms', 'http', 'platform-browser', 'platform-browser-dynamic', 'router', 'router-deprecated', 'upgrade'];

    let ng2MaterialPackages = ['core', 'button', 'icon', 'checkbox', 'input', 'radio'];


    // Individual files (~300 requests):
    function ng2PackageIndex(package) {
        packages['@angular/' + package] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Individual files
    function ng2MaterialPackageIndex(package) {
        packages['@angular2-material/' + package] = { main: package, defaultExtension: 'js' };
    }


    // Bundled (~40 requests):
    function ng2PackageUmd(package) {
        packages['@angular/' + package] = { main: 'bundles/' + package + '.umd.js', defaultExtension: 'js' };
    }

    // TODO: No umd for material packages 
    // Bundled
    /*
    function ng2MaterialPackageUmd(package) {
        packages['@angular/' + package] = { main: 'bundles/' + package + '.umd.js', defaultExtension: 'js' };
    }
    */

    // Most environments should use UMD; some (Karma) need the individual index files
    let setNg2PackageCallback = System.packageWithIndex ? ng2PackageIndex : ng2PackageUmd;

    // Add package entries for @angular packages
    ng2Packages.forEach(setNg2PackageCallback);

    // TODO: No umd for material packages 
    // let setNg2MaterialPackageCallback = System.packageWithIndex ? ng2MaterialPackageIndex : ng2MaterialPackageUmd;
    let setNg2MaterialPackageCallback = ng2MaterialPackageIndex;

    // Add package entries for @angular2-material packages
    ng2MaterialPackages.forEach(setNg2MaterialPackageCallback);

    System.config({
        map: map,
        packages: packages
    });

    System.import('application').catch(function (error) { console.error(error); });
})(this);
