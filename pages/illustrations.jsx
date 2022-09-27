import { memo } from "react";
import Menu from "../components/menu";
import ArticleImg from "../components/articleImg";
import styles from "./illustration.module.css";
import { giftCommentsArray, urlArray } from "../lib/giftIllustComment";



const Illustrations = memo(({comments, posts , url}) =>{

    

    return (
        <>
        <main className={styles.container}>
        <Menu/>
        <h1>Clip art of a gift</h1>
        <p>頂き物や作者様の許可を頂いたイラストを載せています</p>
          {posts.map((fileName,index)=>{return <ArticleImg key={index} text={comments[index]} imgUrl={`/images/${fileName}`} siteUrl={url[index]} /> })}
        </main>
        </>
    )


})
export default Illustrations

export const getStaticProps = async () => {
    const glob = require('glob');
    const files = glob.sync( "./public/images/*.{jpg,png}");
    const fileNames = files.map((file)=>{ return file.split("/").pop()})
    const comments = giftCommentsArray
    const url = urlArray
    return {
      props: {
        url:url,
        comments:comments,
        posts: fileNames,
      },
      revalidate: 1,
    };
  };