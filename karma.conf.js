/*jshint node: true*/
module.exports = function (karmaConf) {
    "use strict";
    var config = {
        // base path, that will be used to resolve files and exclude
        frameworks: ['jasmine'],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots' || 'progress'
        reporters: ['progress'],

        junitReporter: {
            outputFile: 'target/surefire-reports/test-results.xml',
            suite: ''
        },
        coverageReporter: {
            type : 'html',
            dir : 'target/surefire-reports/'
        },

        // - PhantomJS
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    };
    if(process.env.COVERAGE) {
        config.preprocessors = {
            'src/**/*.js': ['coverage']
        };
        config.reporters.push('coverage');
    }
    karmaConf.set(config);
};
