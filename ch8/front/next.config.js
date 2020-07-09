const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer({
    distDir: '.next', // next로 빌드된 파일 저장되는 곳
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html'
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html'
        }
    }, // 공식문서 
    // 지금까지는 dev(nodemon) 환경
    // 배포할때는 build하고 된 것을 start(배포)
    // package.json에서 start, build에 추가된 코드는 맥, 리눅스에서만 가능
    // 윈도우에서는 안되므로 사용하려면 cross-env 설치
    // npm run build 하면 html 파일 생성 -> 파일보고 용량 조절
    // keyword tree shaking 같은 키워드로 검색
    
    webpack(config){
        // console.log('config : ', config);
        // console.log('rules', config.module.rules[0]);
        const prod = process.env.NODE_ENV === 'production';
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',

        };
    } // 기본 webpack 설정을 바꿀 수 있음
});
// next에 대한 설정을 하는 파일
// bundleAnalyzer : 프론트 쪽 패키지 분석해줌
// typescript 사용할 때도 typescript용도 제공해준다.