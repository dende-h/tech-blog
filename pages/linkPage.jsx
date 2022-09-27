import { memo } from "react";
import Menu from "../components/menu";
import styles from "./linkPage.module.css";
import GridItem from "../components/gridItem";


const linkPage = memo(({siteUrl, text, posts}) =>{

    return (
        <>
        <main className={styles.container}>
        <Menu/>
        <h1>Links page</h1>
        <p>フォロワー様のプロフィールページやおすすめサイトへのリンク集です</p>
        <p>掲載希望フォロワー様随時募集中。気軽にDMください⇒<a href="https://twitter.com/dendeiriamaka1">dende趣味Twitter</a></p>
        <div className={styles.grid_parent}>
            {posts.map((fileName,index)=>{return <GridItem key={index} imgUrl={`/gridThumbnail/${fileName}`} text={text[index]} siteUrl={siteUrl[index]}/> })}
        </div>
        </main>
        </>
    )


})
export default linkPage

export const getStaticProps = async () => {
  const fs = require("fs");
  const comment = fs.readFileSync("./public/gridThumbnail/gridComment.txt", "utf-8")
  const text = comment.toString().split(',')
  const url = fs.readFileSync("./public/images/url.txt", "utf-8")
  const siteUrl = url.toString().split(',')
    const glob = require('glob');
    const files = glob.sync( "./public/gridThumbnail/*.{jpg,png}");
    const fileNames = files.map((file)=>{ return file.split("/").pop()})
    return {
      props: {
        siteUrl:siteUrl,
        text:text,
        posts:fileNames,
      },
      revalidate: 1,
    };
  };