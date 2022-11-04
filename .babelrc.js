module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                debug: true,
                modules: false, // Set the type of export/import pattern used. By default false is set, but we can use commonJs, systemJs, amd, etc
                targets: {
                    browsers: [
                        '> 1%',
                        'not IE < 12'
                    ]
                },
                // useBuiltIns: 'entry', // Will add polyfills based on the browsers entry above
                useBuiltIns: 'usage', // Will add polyfills where it's required, based on our code (Guessing always)
                corejs: {
                    version: "3.25.5",
                    proposals: true,
                }
            }
        ]
    ],
    plugins: [
        ["@babel/plugin-transform-runtime"]
    ]
}