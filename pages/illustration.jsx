import { memo } from "react";
import Menu from "../components/menu";
import ArticleImg from "../components/articleImg";
import styles from "./illustration.module.css";




const illustration = memo(({comments, posts}) =>{

    

    return (
        <>
        <main className={styles.container}>
          <Menu/>
          <h1>Dende's illustration place</h1>
          <p>Twitterでupしている管理人自作のオリジナルイラストや二次創作イラストを載せています</p>
          {posts.map((fileName,index)=>{return <ArticleImg key={fileName} text={comments[index]} imgUrl={`/dendeIllust/${fileName}`} /> })}
        </main>
        </>
    )


})
export default illustration

export const getStaticProps = async () => {
  const fs = require("fs");
  const comment = fs.readFileSync("./public/dendeIllust/myComment.txt", "utf-8")
  const comments = comment.toString().split(',')
    const glob = require('glob');
    const files = glob.sync( "./public/dendeIllust/*.{jpg,png}");
    const fileNames = files.map((file)=>{ return file.split("/").pop()})
    return {
      props: {
        comments:comments,
        posts: fileNames,
      },
      revalidate: 1,
    };
  };