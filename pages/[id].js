import { Fragment, useEffect, useState } from "react";
import { getDatabase, getPage, getBlocks } from "../lib/notion";
import Link from "next/link";
import { databaseId } from "./index.js";
import styles from "./post.module.css";
import Prism from "prismjs"
import Seo from "../components/Seo";
import { useRouter } from "next/router";
import { TextBlocks } from "../components/TextBlocks.jsx";


const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];
  
  switch (type) {
    case "paragraph":
      return (
        <p>
          <TextBlocks text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className={styles.h1b}>
          <TextBlocks text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className={styles.h2b}>
          <TextBlocks text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className={styles.h3b}>
          <TextBlocks text={value.text} />
        </h3>
      );
    case "bulleted_list_item":

      return (
        <ul>
          <li>
            <TextBlocks text={value.text} />
          </li>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </ul>
      );
    case "numbered_list_item":
      return (
        <ul>
          <li>
            <TextBlocks text={value.text} />
          </li>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </ul>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <TextBlocks text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <TextBlocks text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>;
    case "code":
      
      const language = block.code.language.toLowerCase()
      return (
        <pre className={styles.pre}>
          <code className={`language-${language}`} key={id} >{value.text[0].plain_text}</code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

const metaDescription = (blocks) => {
  return(blocks.filter((block)=>{ return block.type ==="paragraph"})[0].paragraph.text.map((text)=>{return text.plain_text}).join(""))
}

export default function Post({ page, blocks }) {
  const [metaDes , setMetaDes] = useState("");
  const router = useRouter();
  const asPath = router.asPath
   useEffect(()=>{Prism.highlightAll();
                  if(blocks){
                  setMetaDes(metaDescription(blocks))}},[]) 
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <div>
      <Seo
        pageTitle={page.properties.Name.title[0].plain_text}
        pageDescription={metaDes?metaDes:page.properties.Name.title[0].plain_text}
        pagePath={`https://tech-blog-efcg.vercel.app/${asPath}`}
        pageImg="/24510976_l.jpg"
      />

      <article className={styles.container}>
        <h1 className={styles.name}>
          <TextBlocks text={page.properties.Name.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/">
            <a className={styles.back}>← Go home</a>
          </Link>
        </section>
      </article>
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
