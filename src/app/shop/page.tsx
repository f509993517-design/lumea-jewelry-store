import Link from "next/link";

const products = [
  {
    name: "Aurelia Hoops",
    price: 68,
    image: "/images/aurelia-hoops.jpg",
    slug: "aurelia-hoops",
  },
  {
    name: "Luna Chain",
    price: 75,
    image: "/images/luna-chain.jpg",
    slug: "luna-chain",
  },
  {
    name: "Solace Ring",
    price: 82,
    image: "/images/solace-ring.jpg",
    slug: "solace-ring",
  },
  {
    name: "Celeste Necklace",
    price: 88,
    image: "/images/celeste-necklace.jpg",
    slug: "celeste-necklace",
  },
  {
    name: "Aria Studs",
    price: 64,
    image: "/images/aria-studs.jpg",
    slug: "aria-studs",
  },
  {
    name: "Noa Bracelet",
    price: 72,
    image: "/images/noa-bracelet.jpg",
    slug: "noa-bracelet",
  },
];

export default function Shop() {
  return (
    <main className="page">
      <p className="eyebrow">SHOP</p>

      <div className="shopHeader">
        <div>
          <h1>The collection</h1>

          <p>
            Refined pieces designed to become part of your everyday ritual.
          </p>
        </div>

        <span className="productCount">
          {products.length} pieces
        </span>
      </div>

      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.slug}>
            <Link href={`/shop/${product.slug}`}>
              <div className="productImg">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>
            </Link>

            <div className="productInfo">
              <div>
                <Link href={`/shop/${product.slug}`}>
                  <h3>{product.name}</h3>
                </Link>

                <p>${product.price}</p>
              </div>

              <Link
                href={`/shop/${product.slug}`}
                className="addButton"
              >
                View Product
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}