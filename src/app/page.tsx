import Link from "next/link";
const products=[["Aurelia Hoops","$68","/images/hoops.jpg"],["Luna Chain","$82","/images/chain.jpg"],["Solace Ring","$74","/images/ring.jpg"]];
export default function Home(){return <main>
<section className="hero"><div><p className="eyebrow">FANVIRA / ESSENTIALS</p><h1>Jewelry that<br/><i>stays with you.</i></h1><p className="lead">Refined silhouettes, warm metals, and effortless pieces designed for modern rituals.</p><Link className="button" href="/shop">Explore collection</Link></div></section>
<section className="section"><div className="sectionHead"><p className="eyebrow">THE COLLECTION</p><h2>Quietly distinctive.</h2></div><div className="grid">{products.map(p=><article className="card" key={p[0]}><div className="productImg"><span>FANVIRA</span></div><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></section>
<section className="story"><div><p className="eyebrow">OUR PHILOSOPHY</p><h2>Designed to become part of you.</h2><p>FANVIRA creates understated jewelry with a contemporary point of view—pieces made to layer, gift, collect, and wear again tomorrow.</p><Link href="/about">Discover our story →</Link></div></section>
<section className="newsletter"><p className="eyebrow">THE FANVIRA EDIT</p><h2>Notes on style, rituals & new pieces.</h2><form><input type="email" placeholder="Your email address"/><button>Join</button></form></section>
</main>}