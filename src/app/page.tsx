import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-center flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold text-[#041c4c] mb-4">Welcome to the Admin Panel</h1>
      <p className="text-lg text-[#1d4268] mb-8">
        Manage all the shops and products listed on the platform with ease. 
        Experience a modern and futuristic design that makes management a breeze.
      </p>
      <Link href="/shops">
        <button className="bg-[#4ebcbe] text-white py-2 px-4 rounded-lg hover:bg-[#1d4268] transition duration-300">
          View Shops
        </button>
      </Link>
    </div>
  );
}