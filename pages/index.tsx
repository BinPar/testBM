import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'

const Board = dynamic(() => import('../components/Board'), { ssr: false });

export default (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Busca!</title>
      <link rel="stylesheet" type="text/css" href="/static/style.css" />
    </Head>
    <Board />
  </React.Fragment>
);
