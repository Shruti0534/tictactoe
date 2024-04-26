"use client";
import Image from "next/image";
import React, { useState } from "react";
import R from "@/public/rock.png";
import P from "@/public/hand.png";
import S from "@/public/scissor.png";
import demo from "@/public/demo.png";
import vs from "@/public/vs.png";

const page = () => {
  const [player1, setplayer1] = useState({
    name: "",
    url: demo,
    playname:'Player-1',
    count:0
  });
  const [player2, setplayer2] = useState({
    name: "",
    url: demo,
    playname:'Player-2',
    count:0
  });
  const [winner, setwinner] = useState("4");
  const image = [
    { url: R, name: "R" },
    { url: S, name: "S" },
    { url: P, name: "P" },
  ];
  const randomnumber = (rank) => {
    if (rank === 1) {
      let time;
      for (let i = 0; i <= 20; i++) {
        const num = Math.floor(Math.random() * 3);
        time = setTimeout(() => {
          setplayer1({ ...player1, name: image[num].name, url: image[num].url });
        }, i * 70);
      }
      return () => clearTimeout(time);
    } else if (rank === 2) {
      let time;
      for (let i = 0; i <= 20; i++) {
        const num = Math.floor(Math.random() * 3);
        time = setTimeout(() => {
          setplayer2({ ...player2, name: image[num].name, url: image[num].url });
        }, i * 70);
      }
    }
  };

  function win() {
    if (player1.name === player2.name) {
      setwinner("Trial");
    } else if (player1.name === "R" && player2.name === "P") {
      setwinner("Player-2");
    } else if (player1.name === "S" && player2.name === "R") {
      setwinner("Player-2");
    } else if (player1.name === "P" && player2.name === "S") {
      setwinner("Player-2");
    } else {
      setwinner("Player-1");
    }
  }
  let p1cnt = player1.count
  let p2cnt = player2.count
  const calculatewin = () => {
    if (winner === "Player-1") {
      p1cnt++
    } else if (winner === "Player-2") {
      p2cnt++
    }
    setplayer1({
      ...player1,
      name: "",
      url: demo,
      count:p1cnt
    });
    setplayer2({
      ...player2,
      name: "",
      url: demo,
      count:p2cnt
    });
    setwinner("");
  };

  return (
      
    <div className=" flex justify-center items-center h-screen gap-6">
      <div className=" fixed top-5 font-bold md:text-4xl   text-2xl bg-teal-500 rounded-xl px-4 py-1">Rock Paper Scissor</div>
      { (p1cnt > 0 || p2cnt > 0) &&(
        <div className=" fixed md:top-10 top-20 left-10 bg-yellow-800 rounded-xl px-7 py-4">
          <div className=" font-bold text-xl text-red-600 ">Result</div>
          <div>
            {player1.playname} - {player1.count}
          </div>
          <div>
            {player2.playname} - {player2.count}
          </div>
        </div>
      )}
      {winner === "4" && (
        <div className=" z-20 rounded-xl absolute bg-yellow-500 p-5 space-y-4 ">
          <div className=" flex-col flex">
            <label htmlFor="" className=" text-black">
              Enter First Player Name
            </label>
            <input
              type="text"
              value={player1.playname}
              className=" bg-neutral-700 px-3 rounded-xl py-1"
              onChange={(e) => setplayer1({...player1,playname:e.target.value})}
            />
          </div>
          <div className=" flex-col flex ">
            <label htmlFor="" className=" text-black">
              Enter Second Player Name
            </label>
            <input
              type="text"
              value={player2.playname}
              className=" bg-neutral-700 px-3 rounded-xl py-1"
              onChange={(e) => setplayer2({...player2,playname:e.target.value})}
            />
          </div>
          <button
            onClick={() => setwinner("3")}
            className=" bg-red-600 text-black font-bold hover:bg-red-800 rounded-2xl  px-3 py-1 text-2xl"
          >
            Start
          </button>
        </div>
      )}
      {winner != "" && winner!='3' && winner!='4' && (
        <div className=" flex flex-col justify-center items-center fixed  bg-slate-600 rounded-2xl px-10 py-5">
          <div className=" text-6xl font-bold text-red-400">Winner!</div>
          <div className=" text-2xl font-mono">{winner}</div>
          <button
            onClick={() => calculatewin()}
            className=" text-xl
           font-bold bg-green-600 hover:bg-green-700 px-3 py-1  rounded-xl"
          >
            Restart
          </button>
        </div>
      )}
      <div className=" flex flex-col items-center justify-center">
        <div>
          <Image id="play1" src={player1.url} alt="" className=" md:w-56 md:h-56 w-32 h-32" />
        </div>
        <div>{player1.playname}</div>
        <button
        
          onClick={() => randomnumber(1)}
          className=" bg-red-600 rounded-xl px-3 py-1 text-xl  font-semibold hover:bg-red-700"
        >
          Select
        </button>
      </div>
      <div>
        <Image className=" w-20 h-20" src={vs} alt="vs" />
        <abbr title={(!player1.name || !player2.name )?'Disable':''}>
        <button
        disabled={!player1.name || !player2.name }
          onClick={() => win()}
          className=" bg-red-600 rounded-xl px-3 py-1 text-xl  font-semibold hover:bg-red-700"
        >
          Submit
        </button>
        </abbr>
      </div>
      <div className=" flex flex-col justify-center items-center ">
        <div>
          <Image src={player2.url} alt="" className=" md:w-56 md:h-56 w-32 h-32" />
        </div>
        <div>{player2.playname}</div>
        <button
          onClick={() => randomnumber(2)}
          className=" bg-blue-600 rounded-xl px-3 py-1 text-xl  font-semibold hover:bg-blue-700"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default page;
