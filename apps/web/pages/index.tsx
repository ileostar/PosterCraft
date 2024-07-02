import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const name = useRef<HTMLInputElement>(null)
  const navigate = useRouter()
  const go = () => {
    if (name.current)
      navigate.push(`/hi/${encodeURIComponent(name.current!.value)}`)
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className="i-carbon-campsite text-4xl inline-block" />
      <p>
        <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Next
        </a>
      </p>
      <p>
        <em className="text-sm op75">Opinionated Next.js Starter Template</em>
      </p>
      <div className="py-4" />
      <input
        ref={name}
        id="input"
        placeholder="What's your name?"
        type="text"
        className="px-4 py-2 w-250px text-center bg-transparent outline-none outline-active:none border border-rounded border-gray-200 border-dark:gray-700"
        onKeyDown={({ key }) => key === 'Enter' && go()}
      />

      <div>
        <button
          className="m-3 text-sm btn"
          disabled={!name}
          onClick={() => go() }
        >
        Go
        </button>
      </div>
    </div>
  )
}

export default Home
