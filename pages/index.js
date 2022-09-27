import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import Menu from "../components/menu";
import { useState } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  const [selectValue, setSelectValue] = useState("All Posts");
  const [allPostFlag,setAllPostFlag] = useState(true);


  const changeTag = (e) => {
    setSelectValue(e.target.value)
    if(e.target.value !== "All Posts"){
      setAllPostFlag(false)
    } else {
      setAllPostFlag(true)
    }
  }
  const Tags = posts.map((post) => post.properties.Tags.multi_select[0].name);
  const selectTagPosts = posts.filter((post)=> {return post.properties.Tags.multi_select[0].name === selectValue})
  const set = new Set(Tags);
  const setSelectOption = [...set];
  return (
    <>
      <Head>
        <title>dende's novel site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <Menu />
          <h1>DenDe's Novel site</h1>
          <p>
            のんびり趣味で綴っている私小説サイトです。山梨県でSEをしながらのんびり不定期で更新中。基本的に短編中心で書いています。このサイトはこちらの
            <a href="https://github.com/samuelkraft/notion-blog-nextjs">
              notion-blog-nextjs
            </a>
            を使わせて頂いています。それにしてもNotionで執筆できるのがとても快適です。ありがとうございます。
          </p>
          <p>
            コメント感想などはコチラ→
            <a href="https://twitter.com/dendeiriamaka1">dende趣味Twitter</a>
          </p>
          <p>
            エンジニアに興味がある人はコチラ→
            <a href="https://twitter.com/dendeiriamaka1">学習記録Twitter</a>
          </p>
        </header>
        <div className={`${styles.cp_ipselect} ${styles.cp_sl02}`}>
          <select required onChange={(e)=>changeTag(e)} className="test">
            <option value="All Posts">
              All Posts
            </option>
            {setSelectOption.map((tag,i) => {
              return <option key={i} value={tag}>{tag}</option>;
            })}
          </select>
        </div>
        <h2 className={styles.heading}>{selectValue}</h2>
        <ol className={styles.posts}>
          {allPostFlag ?(posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>
                <p className={styles.postDescription}>{date} 【{post.properties.Tags.multi_select[0].name}】</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })):(selectTagPosts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date} 【{post.properties.Tags.multi_select[0].name}】</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })) }
        </ol>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
