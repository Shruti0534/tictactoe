"use client";
import React, { useState } from "react";

const Tic = () => {
  const [turn, setturn] = useState(true);
  const [win, setwin] = useState("0");
  const [myArray, setmyArray] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }).fill(""))
  );

  const [player1, setplayer1] = useState("Player1");
  const [player2, setplayer2] = useState("Player2");
  const [player1cnt, setplayer1cnt] = useState(0);
  const [player2cnt, setplayer2cnt] = useState(0);
  const checkrow = (myArray) => {
    for (let i = 0; i < 3; i++) {
      let x = 0;
      let y = 0;
      for (let j = 0; j < 3; j++) {
        if (myArray[i][j] === "X") {
          x++;
        } else if (myArray[i][j] === "O") y++;
      }

      if (x === 3) {
        return "1";
      } else if (y === 3) {
        return "2";
      }
    }
  };
  const checkcol = (myArray) => {
    for (let i = 0; i < 3; i++) {
      let x = 0;
      let y = 0;
      for (let j = 0; j < 3; j++) {
        if (myArray[j][i] === "X") {
          x++;
        } else if (myArray[j][i] === "O") y++;
      }

      if (x === 3) {
        return "1";
      } else if (y === 3) {
        return "2";
      }
    }
  };
  const checkdia = (myArray) => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j && myArray[i][j] === "X") {
          x++;
        } else if (i === j && myArray[i][j] === "O") y++;
      }

      if (x === 3) {
        return "1";
      } else if (y === 3) {
        return "2";
      }
    }
  };
  const checkdia2 = (myArray) => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 2; j >=0 ; j--) {
        if (i + j === 2 && myArray[i][j] === "X") {
          x++;
        } else if (i + j === 2 && myArray[i][j] === "O") y++;
      }

      if (x === 3) {
        return "1";
      } else if (y === 3) {
        return "2";
      }
    }
  };
  const reset = () => {
    calculatewin();
    setturn(true);
    setwin("");

    setmyArray(
      Array.from({ length: 3 }, () => Array.from({ length: 3 }).fill(""))
    );
  };
  function Checktrial(narray) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (narray[i][j] === "") {
          return "";
        }
      }
    }
    return "3";
  }
  const calculatewin = () => {
    if (win === "1") {
      setplayer1cnt((prev) => prev + 1);
    } else if (win === "2") {
      setplayer2cnt((prev) => prev + 1);
    }
  };

  const handleFill = (row, col) => {
    const narray = [...myArray.map((row) => [...row])];

    if (narray[row][col] !== "") return;

    narray[row][col] = turn ? "X" : "O";
    setmyArray(narray);
    const x = checkrow(narray);
    const y = checkcol(narray);
    const z = checkdia(narray);
    const a = checkdia2(narray)
    if (x) {
      x === "1" ? setwin("1") : setwin("2");
    } else if (y) {
      y === "1" ? setwin("1") : setwin("2");
    } else if (z) {
      z === "1" ? setwin("1") : setwin("2");
    }
    else if (a) {
      a === "1" ? setwin("1") : setwin("2");
    } else {
      const check = Checktrial(narray);
      setwin(check);
    }
    setturn((prev) => !prev);
  };

  const X = Array.from({ length: 70 }).fill("X");
  const O = Array.from({ length: 70 }).fill("O");

  return (
    <div
      className={`${
        turn ? "bg-blue-700" : "bg-red-700"
      } flex flex-col justify-center bg-opacity-50 items-center ease-in-out duration-700 h-screen w-full gap-5`}
    >
      {turn ? (
        <div className=" flex-wrap flex gap-10 fixed text-blue-500 inset-0 text-9xl z-0 opacity-10">
          {X.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : (
        <div className=" flex-wrap flex gap-10 fixed text-red-500 inset-0 text-9xl z-0 opacity-10">
          {O.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
      {win === "0" && (
        <div className=" z-20 rounded-xl absolute bg-yellow-500 p-5 space-y-4 ">
          <div className=" flex-col flex">
            <label htmlFor="" className=" text-black">
              Enter First Player Name
            </label>
            <input
              type="text"
              value={player1}
              className=" bg-neutral-700 px-3 rounded-xl py-1"
              onChange={(e) => setplayer1(e.target.value)}
            />
          </div>
          <div className=" flex-col flex ">
            <label htmlFor="" className=" text-black">
              Enter Second Player Name
            </label>
            <input
              type="text"
              value={player2}
              className=" bg-neutral-700 px-3 rounded-xl py-1"
              onChange={(e) => setplayer2(e.target.value)}
            />
          </div>
          <button
            onClick={() => setwin("")}
            className=" bg-red-600 text-black font-bold hover:bg-red-800 rounded-2xl  px-3 py-1 text-2xl"
          >
            Start
          </button>
        </div>
      )}
      {win != "0" && win != "" && (
        <div className=" z-20  flex flex-col items-center justify-center py-7 px-10 gap-4 fixed bg-slate-600 rounded-xl">
          <div
            className={`${
              win === "1" ? "text-blue-500" : "text-red-500"
            } text-4xl font-bold`}
          >
            {win === "3" ? "Trial!" : "Winner!"}
          </div>
          {win != "3" && <div>{win === "1" ? `${player1}` : `${player2}`}</div>}
          <button
            onClick={reset}
            className=" bg-green-500 px-4 py-1 hover:bg-green-700 rounded-xl"
          >
            Reset
          </button>
        </div>
      )}
      {win != "0" && (player1cnt > 0 || player2cnt > 0) && (
        <div className=" fixed top-10 left-10 bg-yellow-800 rounded-xl px-7 py-4">
          <div className=" font-bold text-xl text-red-600 ">Result</div>
          <div>
            {player1} - {player1cnt}
          </div>
          <div>
            {player2} - {player2cnt}
          </div>
        </div>
      )}
      <div className=" z-10 bg-indigo-700 rounded-2xl px-4 py-2 text-2xl font-semibold font-mono ">
        Turn - {turn ? `${player1}` : `${player2}`}
      </div>
      <div className=" z-10 ">
        {myArray.map((item, row) => {
          return (
            <div key={row} className="flex">
              {item.map((i, col) => (
                <div key={col}
                  className={` ${
                    myArray[row][col] === "X" ? `text-blue-500` : `text-red-500`
                  } flex  text-4xl font-extrabold cursor-pointer justify-center items-center border-2 py-3 px-5 w-16 h-16`}
                  onClick={() => handleFill(row, col)}
                >
                  {i}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tic;
