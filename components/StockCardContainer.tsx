import { signIn, signOut, useSession } from "next-auth/react";

import AppBar from '../components/ResponsiveAppBar'
import Card from "../components/Card";
import Head from "next/head";

const StockCardContainer = ({stocks}) => {
const { data: session } = useSession();

// if(!session)
//     window.location.href = 'http://localhost:3000';

  return (
    <div>
      <Head>
        <title>Trending Stock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      {/* <LoginButton /> */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '10px',
          padding: '0 10px',
          margin: '0 auto',
          maxWidth: '1200px',
        }}
      >
        {stocks?.map(stock => (
          <Card title={stock.sn} subHeader={stock.in} key={stock.sId} />
        ))}
      </div>

    </div>
  );
}

export default StockCardContainer;