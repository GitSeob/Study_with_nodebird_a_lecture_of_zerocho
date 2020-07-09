import React from 'react'
import Document, { Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import propTypes from 'prop-types'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document{
    static getInitialProps(context){
        const sheet = new ServerStyleSheet();
        const page = context.renderPage((App)=>(props)=>sheet.collectStyles(<App {...props} />)); // App : _app.js => renderpage ,, 앱을 실행해주는 수행
        const styleTags = sheet.getStyleElement();
        return { ...page, helmet: Helmet.renderStatic(), styleTags }; // props로 styleTags 넣어준거임
    }

    render(){
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent()
        const bodyAttrs = bodyAttributes.toComponent()
        return(
            <html {...htmlAttrs}>
                <head>
                    {this.props.styleTags}
                    {Object.values(helmet).map(el=>el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    } // Main이 app.js가 될거임
    // NextScript는 Next구동에 필요한것
}

MyDocument.propTypes = {
    helmet: propTypes.object.isRequired,
    styleTags: propTypes.object.isRequired
}

export default MyDocument