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

      <h1>The collection</h1>

      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.name}>
            <div className="productImg">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <h3>{product.name}</h3>

            <p>${product.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
}