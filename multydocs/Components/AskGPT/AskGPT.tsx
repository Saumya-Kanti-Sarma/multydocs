
"use client";

import Image from "next/image";

export default function AskGPT() {
  const askGPT = () => {
    const prompt = `Hey can you tell me more about this site [multydocs](https://multydocs.in/llms.txt) `;


    const url = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <button onClick={askGPT} className=" opacity-50 cursor-pointer flex gap-1 transition duration-200 hover:opacity-100 hover:scale-105">
      <Image src={"https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg"} height={10} width={10} alt="ask chat gpt" /> Ask GPT
    </button>
  );
}