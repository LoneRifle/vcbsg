import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Voucher Cashback Buddies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Coming Soon!" />
        <p className="description">
          Share your ShopBack voucher group buy link to get more cashback 
          with <a href="https://t.me/vcbsg_bot">@vcbsg_bot</a> on Telegram
        </p>
        <p className="description">
          Get more cashback when buying ShopBack vouchers - find someone 
          who has done the same at <a href="https://t.me/vcbsg">@vcbsg</a> on Telegram
        </p>
      </main>

      <Footer />
    </div>
  )
}
