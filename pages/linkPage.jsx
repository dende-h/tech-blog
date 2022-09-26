import { memo } from "react";
import Menu from "../components/menu";
import styles from "./linkPage.module.css";
import Image from 'next/image'

const linkPage = memo(() =>{

    return (
        <>
        <main className={styles.container}>
        <Menu/>
        <h1>Links page</h1>
        <p>フォロワー様のプロフィールページやおすすめサイトへのリンク集です</p>
        <p>掲載希望フォロワー様随時募集中。気軽にDMください⇒<a href="https://twitter.com/dendeiriamaka1">dende趣味Twitter</a></p>
        <div className={styles.grid_parent}>
           <div className={styles.grid_item}>
                <Image src={"/1.jpg"} width={"350px"} height={"200px"} objectFit="contain" />
                <a>daredaresama</a>
            </div>
            <div className={styles.grid_item}>
                <Image src={"/0.png"} width={"350px"} height={"200px"} objectFit="contain"/>
                <a>daredaresama</a>
            </div>
            <div className={styles.grid_item}>
                <Image src={"/vercel.svg"} width={"350px"} height={"200px"} objectFit="contain"/>
                <a>daredaresama</a>
            </div>
            <div className={styles.grid_item}>
                <Image src={"/favicon.ico"} width={"350px"} height={"200px"} objectFit="contain"/>
                <a>daredaresama</a>
            </div>
            <div className={styles.grid_item}>
                <Image src={"/1.jpg"} width={"350px"} height={"200px"} objectFit="contain"/>
                <a>daredaresama</a>
            </div>
            
        </div>
        </main>
        </>



    )


})
export default linkPage