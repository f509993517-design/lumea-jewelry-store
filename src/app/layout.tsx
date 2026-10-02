import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FANVIRA — Modern Jewelry",
  description: "Quiet luxury jewelry designed for everyday elegance."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>
    <header className="nav">
      <Link className="logo" href="/">FANVIRA</Link>
      <nav><Link href="/shop">Shop</Link><Link href="/about">Our Story</Link><Link href="/journal">Journal</Link><Link href="/cart">Cart</Link></nav>
    </header>
    {children}
    <footer><div className="logo">FANVIRA</div><p>Quiet luxury. Everyday ritual.</p><small>© 2026 FANVIRA. All rights reserved.</small></footer>
  </body></html>
}