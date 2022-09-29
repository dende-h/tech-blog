import Head from 'next/head'
import { useRouter } from 'next/router'

export const SITE_TITLE = '田舎でのんびり書くテックブログ'
export const SITE_DESCRIPTION =
  '普段の学習記録を公開しているテックブログです。主な学習言語はJavaとJavaScript,TypeScriptです。WordPressようにPHPや、インフラ周りはAWSの学習に取り組もうとしているところです。'

const Head = ( title , description, urlOgImage ) => {
  const { asPath } = useRouter()

  return (
    <Head>
      <title>{title ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>
      <meta
        name="description"
        content={description ? description : SITE_DESCRIPTION}
      />
      {NEXT_PUBLIC_URL ? (
        <meta
          property="og:url"
          content={asPath}
        />
      ) : null}
      <meta property="og:title" content={title ? title : SITE_TITLE} />
      <meta
        property="og:description"
        content={description ? description : SITE_DESCRIPTION}
      />
      {urlOgImage ? (
        <meta property="og:image" content={urlOgImage} />
      ) : <meta
          property="og:image"
          content='/default.png'
        />}
      <meta name="twitter:card" content="summary_large_image" />
      {urlOgImage ? (
        <meta name="twitter:image" content={urlOgImage} />
      ) : <meta
          name="twitter:image"
          content='/default.png'
        />}
    </Head>
  )
}

export default Head