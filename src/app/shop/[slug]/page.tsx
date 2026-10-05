import Link from "next/link";
import AddToCartButton from "../../components/AddToCartButton";

const products = [
  {
    name: "Aurelia Hoops",
    price: 68,
    image: "/images/aurelia-hoops.jpg",
    slug: "aurelia-hoops",
    description:
      "A refined everyday hoop designed with a soft, timeless silhouette.",
    material: "925 Sterling Silver & Shimmering Jade",
  },
  {
    name: "Luna Chain",
    price: 75,
    image: "/images/luna-chain.jpg",
    slug: "luna-chain",
    description:
      "A delicate chain with an effortless presence, made for everyday layering.",
    material: "925 Sterling Silver & Shimmering Jade",
  },
  {
    name: "Solace Ring",
    price: 82,
    image: "/images/solace-ring.jpg",
    slug: "solace-ring",
    description:
      "A sculptural ring with a quiet character designed to complement every look.",
    material: "925 Sterling Silver & Shimmering Jade",
  },
  {
    name: "Celeste Necklace",
    price: 88,
    image: "/images/celeste-necklace.jpg",
    slug: "celeste-necklace",
    description:
      "An elegant necklace created to bring a subtle sense of light to everyday moments.",
    material: "925 Sterling Silver & Shimmering Jade",
  },
  {
    name: "Aria Studs",
    price: 64,
    image: "/images/aria-studs.jpg",
    slug: "aria-studs",
    description:
      "Minimal stud earrings with a refined silhouette for effortless daily wear.",
    material: "925 Sterling Silver & Shimmering Jade",
  },
  {
    name: "Noa Bracelet",
    price: 72,
    image: "/images/noa-bracelet.jpg",
    slug: "noa-bracelet",
    description:
      "A delicate bracelet designed to feel natural, understated, and personal.",
    material: "925 Sterling Silver & Shimmering Jade",
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="page">
        <p className="eyebrow">PRODUCT NOT FOUND</p>

        <h1>We couldn't find that piece.</h1>

        <Link href="/shop" className="button">
          Back to Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="page productPage">
      <Link href="/shop" className="backLink">
        ← Back to Collection
      </Link>

      <div className="productDetail">
        <div className="productDetailImage">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="productDetailInfo">
          <p className="eyebrow">FANVIRA JEWELRY</p>

          <h1>{product.name}</h1>

          <p className="productPrice">${product.price}</p>

          <p className="productDescription">
            {product.description}
          </p>

          <div className="productMeta">
            <p>
              <strong>Material</strong>
              <br />
              {product.material}
            </p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}