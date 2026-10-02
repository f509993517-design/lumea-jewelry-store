const products = [
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
  {
    name: "Celeste Necklace",
    price: 88,
    image: "/images/celeste-necklace.jpg",
  },
  {
    name: "Aria Studs",
    price: 64,
    image: "/images/aria-studs.jpg",
  },
  {
    name: "Noa Bracelet",
    price: 72,
    image: "/images/noa-bracelet.jpg",
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
          <article className="card" key={product.name}>
            <div className="productImg">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="productInfo">
              <div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>

              <button className="addButton">
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}