import { memo } from "react";
import Menu from "../components/menu";
import ArticleImg from "../components/articleImg";
import styles from "./illustration.module.css";



const GiftArt = memo(({comments, posts , urls , authorNames}) =>{

    

    return (
        <>
        <main className={styles.container}>
        <Menu/>
        <h1>Clip art of a gift</h1>
        <p>頂き物や作者様の許可を頂いたイラストを載せています</p>
          {posts.map((fileName,index)=>
            {return <ArticleImg key={index} text={comments[index]} imgUrl={`/images/${fileName}`} siteUrl={urls[index]} authorName={authorNames[index]}/> })}
        </main>
        </>
    )


})
export default GiftArt

export const getStaticProps = async () => {
   const fs = require("fs");
   const authorName = fs.readFileSync("./public/images/authorName.txt", "utf-8")
   const authorNames = authorName.toString().split(',')
   const comment = fs.readFileSync("./public/images/comment.txt", "utf-8")
   const comments = comment.toString().split(',')
   const url = fs.readFileSync("./public/images/url.txt", "utf-8")
   const urls = url.toString().split(',')
    const glob = require('glob');
    const files = glob.sync( "./public/images/*.{jpg,png}");
    const fileNames = files.map((file)=>{ return file.split("/").pop()})
    
    return {
      props: {
        authorNames:authorNames,
        urls:urls,
        comments:comments,
        posts: fileNames,
      },
      revalidate: 1,
    };
  };