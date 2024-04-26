import Tic from "@/components/Tic";
import Link from "next/link";
import tic from "@/public/ticc.png";
import rock from "@/public/rocks.png";
import Image from "next/image";

export default function Home() {
  const game = [
    {
      name: "Tic Tac Toe",
      url: "/tictactoe",
      img: tic,
    },
    {
      name: "Rock Paper Scissor",
      url: "/rockpaper",
      img: rock,
    },
  ];
  return (
    <main className=" h-screen flex justify-center items-center flex-col  gap-4">
      <div className=" bg-yellow-500 md:text-5xl text-2xl font-bold rounded-2xl px-4 py-1">
        GAMES
      </div>
      <div className="md:flex block  justify-center items-center gap-4">
        {game.map((item) => (
          <Link className=" text-center" href={item.url} key={item.name}>
            <Image className="  w-56 h-56" src={item.img} alt="s" />
            <div className=" text-xl font-bold">{item.name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
