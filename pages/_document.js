
import { Html, Head, Main, NextScript } from "next/document";
import Document from 'next/document';

class MyDocument extends Document {
  render(){
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://js.stripe.com/v3/"
          type ="text/javascript"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
}

export default MyDocument;
