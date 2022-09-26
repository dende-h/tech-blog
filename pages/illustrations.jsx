import { memo } from "react";
import Menu from "../components/menu";
import ArticleImg from "../components/articleImg";
import styles from "./illustration.module.css";
import { commentsArray } from "../lib/comment";



const Illustrations = memo(({comments, posts}) =>{

    

    return (
        <>
        <main className={styles.container}>
        <Menu/>
        <h1>Dende's illustration place</h1>
        <p>Twitterでupしているオリジナルイラストや二次創作イラストを載せています</p>
        {posts.map((fileName,index)=>{return <ArticleImg key={index} text={comments[index]} imgUrl={`/images/${fileName}`} /> })
           }
           </main>
        </>



    )


})
export default Illustrations

export const getStaticProps = async () => {
    const glob = require('glob');
    const files = glob.sync( "./public/images/*.{jpg,png}");
    const fileNames = files.map((file)=>{ return file.split("/").pop()})
    const comments = commentsArray
    return {
      props: {
        comments:comments,
        posts: fileNames,
      },
      revalidate: 1,
    };
  };