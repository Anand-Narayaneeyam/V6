/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-concat');
    var appFolder = "app";
    grunt.initConfig({
        ts: {
            base: {
                src: ['!Scripts/app/Framework/ExternalLibraries/*.ts', 'Scripts/app/**/*.ts'],
                outDir: 'dist/' + appFolder,
                tsconfig: './tsconfig.json',
                options: {
                    sourceMap: false
                }
            }
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'dist/' + appFolder,
                    src: ['**/*.js'],
                    dest: 'dist/' + appFolder
                }]
            },
            options: {
                sourceMap: false
            }
        },
        concat: {
            options: {
                separator: ';\n',
                /*process: function (src, filepath) {
                    if (filepath.includes("Component.routes")) {
                        var reg = /(require\('.\/whatever.*?\))/gi;
                        src = src.replace(reg, "require('app/prodapp.js')");
                    }
                    else if (filepath.includes("app.component")) {
                        var reg = /(require\('.\/.Framework.*?\))/gi;
                        src = src.replace(reg, "require('app/prodapp')");
                    }
                    else if (filepath.includes(".route")) {
                        var reg = /(require\('.\/.*?\))/gi;
                        src = src.replace(reg, "require('app/prodapp')");
                    }
                    else {
                        var reg = /(require\('..\/.*?\))/gi;
                        src = src.replace(reg, "require('app/prodapp')");

                        var reg = /(require\("..\/.*?\))/gi;
                        src = src.replace(reg, "require('app/prodapp')");

                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizWebapp.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizWebapp.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizApiHandler.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizApiHandler.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizLayers.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizLayers.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizViewer.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizViewer.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizEntity.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizEntity.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizZoom.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizZoom.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizErrorStatus.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizErrorStatus.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/Drawing\/iWhizTools.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/Drawing/iWhizTools.js')");
                        var reg = /(require\("..\/..\/..\/..\/Scripts\/zlib.min.js.*?\))/gi;
                        src = src.replace(reg, "require('../Scripts/zlib.min.js')");
                    }
                    return src;
                },*/
            },
            dist: {
                src: ['dist/' + appFolder + '/Framework/Models/*.js', 'dist/' + appFolder + '/Framework/Whatever/*.js', 'dist/' + appFolder + '/Models/**/*.js', 'dist/' + appFolder + '/Whatever/**/*.js'],
                //src: ['dist/' + appFolder + '/Models/administration/administration.service.js'],
                dest: 'dist/' + appFolder + '/prodapp.js',
            },
            routes: {
                src: ['dist/' + appFolder + '/Component.routes.js'],
                //src: ['dist/' + appFolder + '/Models/administration/administration.service.js'],
                dest: 'dist/' + appFolder + '/Component.routes.js',
            },
            app: {
                src: ['dist/' + appFolder + '/app.component.js'],
                //src: ['dist/' + appFolder + '/Models/administration/administration.service.js'],
                dest: 'dist/' + appFolder + '/app.component.js',
            },
        },
        // Copy all JS files from external libraries and required NPM packages to wwwroot/js
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['CopyScripts/**/*.*',
                        'bin/**/*.*', 'Content/**/*.*', 'fonts/**/*.*', 'iWhizLib/**/*.*', 'MockData/**/*.*', 'Reference/**/*.*',
                        'typings/**/*.*', 'Views/**/*.*', 'Scripts/**/*.js', 'app/*.js', 'app/*.asmx', 'app/*.asmx.cs',
                        '*.json', '*.ico', '*.asax', '*.html', '*.config', '*.js', '*.config'
                    ],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            },
            views: {
                files: [{
                    expand: true,
                    src: [
                        'app/**/*.html', 'app/**/*.css'
                    ],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
            ,
            externalLibs: {
                files: [{
                    expand: true,
                    src: [
                        'app/Framework/ExternalLibraries/**/*.*',
                        'app/**/*.json',
                        'app/*.asmx'
                    ],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        }
    });

    // Define the default task so it will launch all other tasks
    grunt.registerTask('default', ['ts', 'uglify', 'copy']);
    //grunt.registerTask('prod-app-only', ['ts', 'uglify', 'copy:externalLibs', 'copy:views','concat']);
    //grunt.registerTask('prod-app-only', ['ts', 'copy:externalLibs', 'copy:views', 'concat']);
    grunt.registerTask('prod-app-only', ['ts', 'uglify', 'copy:externalLibs', 'copy:views']);
};