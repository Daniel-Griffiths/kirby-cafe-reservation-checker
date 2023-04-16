import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between pt-24 bg-[#ffe963]">
          <div className="z-10 max-w-full w-2xl items-center  font-mono text-sm">
            <Main />
          </div>
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
