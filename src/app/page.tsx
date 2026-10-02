const featuredProducts = [
  {
    name: "Aurelia Hoops",
    price: 68,
    image: "/images/aurelia-hoops.jpg",
  },
  {
    name: "Luna Chain",
    price: 75,
    image: "/images/luna-chain.jpg",
  },
  {
    name: "Solace Ring",
    price: 82,
    image: "/images/solace-ring.jpg",
  },
];

export default function Home() {
  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <div>
            <p className="eyebrow">FANVIRA JEWELRY</p>

            <h1>
              Jewelry that
              <br />
              <i>stays with you.</i>
            </h1>

            <p className="lead">
              Refined silhouettes, warm metals, and effortless pieces
              designed for modern rituals.
            </p>

            <a href="/shop" className="button">
              Explore Collection
            </a>
          </div>
        </section>

        {/* COLLECTION */}
        <section className="section">
          <div className="sectionHead">
            <p className="eyebrow">THE COLLECTION</p>

            <h2>Quietly distinctive.</h2>
          </div>

          <div className="grid">
            {featuredProducts.map((product) => (
              <article className="card" key={product.name}>
                <a href="/shop">
                  <div className="productImg">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <h3>{product.name}</h3>

                  <p>${product.price}</p>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* STORY */}
        <section className="story">
          <div>
            <p className="eyebrow">OUR PHILOSOPHY</p>

            <h2>Made to become part of your everyday.</h2>

            <p>
              FANVIRA creates timeless jewelry with a quiet sense of
              luxury. Each piece is designed to feel effortless,
              considered, and personal — from the first wear to the
              moments that stay with you.
            </p>

            <a href="/about" className="button">
              Discover Our Story
            </a>
          </div>
        </section>

        {/* JOURNAL */}
        <section className="section">
          <div className="sectionHead">
            <p className="eyebrow">THE JOURNAL</p>

            <h2>Notes on modern adornment.</h2>
          </div>

          <div className="journal">
            <article>
              <p className="eyebrow">STYLE</p>

              <h3>How to build a timeless jewelry wardrobe</h3>

              <p className="lead">
                A considered collection begins with a few pieces
                that work effortlessly together.
              </p>

              <a href="/journal" className="button">
                Read More
              </a>
            </article>

            <article>
              <p className="eyebrow">FANVIRA EDIT</p>

              <h3>The quiet luxury of everyday gold</h3>

              <p className="lead">
                Discover simple ways to layer delicate pieces without
                losing their individual character.
              </p>

              <a href="/journal" className="button">
                Read More
              </a>
            </article>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter">
          <p className="eyebrow">STAY IN THE KNOW</p>

          <h2>Join the FANVIRA world.</h2>

          <p className="lead" style={{ margin: "0 auto" }}>
            Sign up for new collections, journal notes, and quiet
            moments of inspiration.
          </p>

          <form>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
            />

            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>