import Head from 'next/head'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { extractLink } from 'common'

const toastOptions = {
  success: {
    style: {
      background: '#eaffea',
    },
  },
  error: {
    style: {
      background: '#ffeaea',
    },
  },
}

export default function Home() {
  const { register, handleSubmit } = useForm()
  const submitBody = async body => {
    const link = extractLink(body)
    if (!link) {
      throw new Error(
        'No valid ShopBack voucher link found.\n' +
        'The link is either missing or invalid.'
      )
    }
    const response = await fetch(
      '/api/web',
      {
        body,
        method: 'POST',
      }
    )
    const { message } = await response.json()
    if (!response.ok) {
      throw new Error(message)
    } else {
      return message
    }
  }
  const onSubmit = ({ body }) => {
    toast.promise(
      submitBody(body), 
      {
        loading: 'Submitting',
        success: message => message,
        error: ({ message }) => message,
      },
      {
        style: {
          minWidth: '23rem',
        }
      }
    )
  }
  return (
    <div className="container">
      <Toaster toastOptions={toastOptions} />
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
            <div className="form-body">
              <textarea {...register('body')}/>
            </div>
            <div className="form-submit">
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
