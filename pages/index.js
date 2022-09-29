import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import { useState } from "react";
import Seo from "../compornets/Seo";

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
            <h4>ここは管理人の<text className={styles.text} onClick={()=>setShowFlag(!showFlag)}>{myName}</text>が普段の学習記録を公開しているテックブログです。</h4>
            {showFlag ? <p>《自己紹介》<br/>2021年5月34歳～プログラミング学習をはじめました。主な学習言語はJavaとJavaScript,TypeScriptです。
            WordPressようにPHPや、インフラ周りはAWSの学習に取り組もうとしているところです。<br/>
            2022年7月35歳でなんのご縁か触ったこともないCOBOLで社会福祉法人の会計や給食、入所者管理などの
            システムを提供している会社で開発のSEとして働いています。<br/>
            新規開発はなく保守とバージョンアップなので、のんびりしております。</p> :null}       
            <p>このブログはNext.jsで開発されており
            <a href="https://github.com/samuelkraft/notion-blog-nextjs">
              notion-blog-nextjs
            </a>
            をカスタムして使わせて頂いています。<br/>
            普段のメモがそのまま公開できるのでとても快適です。<br/>
            ありがとうございます。
            </p>
            <p>プログラミング学習&コミュニティとして<a href="https://raise-tech.net/">RaiseTech</a> を利用しています。
            無期限サポートと活発なコミュニティ、熱心な講師陣がおります。
            これから転職を目指す方、独学で挫折した方、独りでの学習に挫けそうな方は特におすすめです。
            </p>
          </div>
          <p>
            エンジニア学習初めてから学習記録をツイートしています→
            <a href="https://twitter.com/dende49592814">学習記録Twitter</a>
          </p>
          <p>
            同じ記事をQiitaにもあげています→
            <a href="https://qiita.com/dende-h">Qiitaマイページ</a>
          </p>
          <p>
            趣味で小説書いたり、イラスト描いたりしています。うまくはないです→
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
