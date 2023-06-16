import { useState } from 'react'
import styles from '../styles/Article.module.css'
import Link from 'next/link';
export default function Articles({articles}) {
    var [slices, setSlices] = useState(3);
  return (
    <div className={styles.container}>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id={styles.Search} />
      <div className={styles.articles}>
        <h5>What's happenning</h5>
      {articles?.slice(0,slices).map((article)=> (
      <div key={article.title} className={styles.article}>   
            <div  id={styles.description}>
              <p><Link  href={article.url} target="_blank" rel="noreferrer">{article.title}</Link></p>         
            </div>
            <div  id={styles.image}>
              <img src={article.urlToImage} alt=''  />
            </div>
      </div>))}
          <button type='button'  className={styles.show} onClick={()=> setSlices( slices +3)}>show more</button >
      </div>
    </div>
  )
}
