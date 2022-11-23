import Head from "next/head";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900">
      <Head>
        <title>InvestBot</title>
        <meta name="description" content="Temporary home :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-6xl text-white">Hello :o</h1>
      </main>
    </div>
  );
}
