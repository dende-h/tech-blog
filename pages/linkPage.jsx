import { memo } from "react";
import Menu from "../components/menu";
import styles from "./linkPage.module.css";

const linkPage = memo(() =>{

    return (
        <>
        <main className={styles.container}>
        <Menu/>
        <h1>Links page</h1>
        <p>フォロワー様のプロフィールページやおすすめサイトへのリンク集です</p>
        <p>掲載希望フォロワー様随時募集中。気軽にDMください⇒<a href="https://twitter.com/dendeiriamaka1">dende趣味Twitter</a></p>
        <div className={styles.grid_parent}>
            <div className={styles.grid_item}>1</div>
            <div className={styles.grid_item}>2</div>
            <div className={styles.grid_item}>3</div>
            <div className={styles.grid_item}>4</div>
            <div className={styles.grid_item}>5</div>
        </div>
        </main>
        </>



    )


})
export default linkPage