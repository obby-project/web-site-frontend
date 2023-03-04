import Link from "next/link";

export default function Form() {
  return (
    <div className="bg-[#b22b39] h-screen w-screen relative">
      <div className="mask absolute left-[50%] top-[50%]  ml-[-100px] mt-[-100px]">
        <Link href="/form">
          <img alt="logo" src="/logo-mask.png" width={200} height={200} />
        </Link>
      </div>
    </div>
  );
}
