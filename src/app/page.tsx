import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className={'flex flex-col gap-4'}>
        <Link className="hover:underline px-4 py-1 text-sm bg-secondary rounded text-primary" href={"/categories"}>
          Categories
        </Link>
        <Link className="hover:underline px-4 py-1 text-sm bg-secondary rounded text-primary" href={"/products"}>
          Products
        </Link>
        <Link className="hover:underline px-4 py-1 text-sm bg-secondary rounded text-primary" href={"/features"}>
          Features
        </Link>
        <Link className="hover:underline px-4 py-1 text-sm bg-secondary rounded text-primary" href={"/store"}>
          Store
        </Link>
      </div>
    </main>
  )
}
