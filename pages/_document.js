/* eslint-disable react/react-in-jsx-scope */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
         <Html lang="en">
            <Head>
               <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID}`}
               />
               <script
                  dangerouslySetInnerHTML={{
                    __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', ${JSON.stringify(
                                   process.env
                                      .NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID
                                )} , {
                                page_path: window.location.pathname,
                                });
                            `
                  }}
               />
            </Head>
            <body>
               <div id={'globalLoader'} >
               </div>
               <Main />
               <NextScript />
            </body>
         </Html>
    )
  }
}

export default MyDocument
