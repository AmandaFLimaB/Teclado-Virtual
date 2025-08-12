import { useState } from "react";
import TypingArea from "./components/TypingArea";
import Keyboard from "./components/Keyboard";

export default function App() {
  const [typedText, setTypedText] = useState("");

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setTypedText((prev) => prev.slice(0, -1));
    } else {
      setTypedText((prev) => prev + key);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#2B2B2B] md:p-4">
      <h1 className="w-4/5 max-w-full h-full text-5xl text-center font-bold mb-4 font-sans text-gray-300 ">Teclado Virtual</h1>
      <TypingArea text={typedText} />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}