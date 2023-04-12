module.exports = {
    defaultNamespace: 'translation',
    lexers: {
        js: ['JsxLexer'], // we're writing jsx inside .js files
        default: ['JavascriptLexer'],
    },
    locales: ['en', 'uk'],
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    input: [ 'src/**/*.js', ],
}