import Image from 'next/image'
import styles from "../pages/linkPage.module.css";
import { memo } from "react";

const GridItem = memo((props) => {
const {text , imgUrl,siteUrl } = props

    return( 
    <>
    <div className={styles.grid_item}>
                <Image src={imgUrl} width={"350px"} height={"200px"} objectFit="contain" />
                <a href={siteUrl}>{text}</a>
     </div>
        
    </>)
})
export default GridItem