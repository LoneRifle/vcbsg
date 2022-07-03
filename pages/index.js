import Head from 'next/head'
import { useForm } from 'react-hook-form'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async ({ body }) => {
    await fetch(
      '/api/web',
      {
        body,
        method: 'POST',
      }
    )
  }
  return (
    <div className="container">
      <Head>
        <title>Voucher Cashback Buddies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Voucher Cashback Buddies" />
        <div>
          <p className="description">
            Share your ShopBack voucher group buy link to get more cashback 
            below, or with <a href="https://t.me/vcbsg_bot">@vcbsg_bot</a> on Telegram
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-body">
              <textarea {...register('body')}/>
            </div>
            <div class="form-submit">
              <input type="submit" value="Go"/>
            </div>
          </form>
        </div>
        <div>
          <p className="description">
            Get more cashback when buying ShopBack vouchers - find someone 
            who has done the same <a target="_blank" href="https://t.me/s/vcbsg">here</a>!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
