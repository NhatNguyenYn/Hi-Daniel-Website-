import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = { title: "Blog — Hi Daniel!" };

// Placeholder so the navbar link works; replace with the real blog later.
export default function Blog() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-center">
      <div>
        <Logo className="justify-center" />
        <h1 className="heading-lg mt-8 text-navy-900">Blog — sắp ra mắt</h1>
        <p className="mt-4 text-navy-900/60">Coming soon.</p>
        <Link href="/" className="btn-primary mt-8">
          ← Trang chủ
        </Link>
      </div>
    </main>
  );
}
