import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { TextBlocks } from "../components/TextBlocks";
import styles from "./index.module.css";
import { Fragment, useState } from "react";
import Seo from "../components/Seo";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  const [selectValue, setSelectValue] = useState("All Posts");
  const [allPostFlag,setAllPostFlag] = useState(true);
  const [showFlag , setShowFlag] = useState(false);
  const myName = (showFlag ? "close" : "dende")
  const AllPosts = posts.filter((post) => {return post.properties.Published.checkbox === true})
 
  const changeTag = (e) => {
    setSelectValue(e.target.value)
    if(e.target.value !== "All Posts"){
      setAllPostFlag(false)
    } else {
      setAllPostFlag(true)
    }
  }
  const Tags = AllPosts.map((post) => post.properties.Tags.multi_select[0].name);
  const selectTagPosts = AllPosts.filter((post)=> {return post.properties.Tags.multi_select[0].name === selectValue})
  const set = new Set(Tags);
  const setSelectOption = [...set];


  return (
    <>
      <Seo 
        pagePath="https://tech-blog-efcg.vercel.app/"
        pageImg="/24510976_l.jpg"
      />

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>田舎でのんびり書くテックブログ</h1>
          <div>
            <h4>ここは管理人の『でんで』が普段の学習記録を公開しているテックブログです。</h4>   
            <p>このブログはNext.jsで開発されており
            <a href="https://github.com/samuelkraft/notion-blog-nextjs">
              notion-blog-nextjs
            </a>
            をカスタムして使わせて頂いています。<br/>
            普段のメモがそのまま公開できるのでとても快適です。<br/>
            ありがとうございます。
            </p>
          </div>
          <p>
            情報キャッチ用のTwitter。たまにツイートしています→
            <a href="https://twitter.com/dende49592814">学習記録Twitter</a>
          </p>
          <p>
           Qiitaにも記事あげています→
            <a href="https://qiita.com/dende-h">Qiitaマイページ</a>
          </p>
          <p>
            趣味用のTwitter。たまにイラスト書いたり→
            <a href="https://twitter.com/dendeiriamaka1">dende趣味Twitter</a>
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
          {allPostFlag ?(AllPosts.map((post) => {
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
                      <TextBlocks text={post.properties.Name.title} />
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
                      <TextBlocks text={post.properties.Name.title} />
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
