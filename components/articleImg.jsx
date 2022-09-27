import Image from 'next/image'
import styles from "../pages/illustration.module.css";
import { memo } from "react";

const ArticleImg = memo((props) => {
const {text , imgUrl ,siteUrl , authorName} = props

    return( 
    <>
    <article className={styles.article}>
                <div className={styles.text}>
                    <p>{text}</p>
                    {siteUrl ? <a href={siteUrl}>{authorName}</a> :null}
                </div>
                <div className={styles.logo}>
                    <Image src={imgUrl} width={600} height={600} objectFit="contain"  loading={"lazy"} ></Image>
                </div>
    </article>
        
    </>)
})
export default ArticleImg