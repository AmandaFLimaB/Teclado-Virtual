type TypingAreaProps = {
  text: string;
};

export default function TypingArea({ text }: TypingAreaProps) {
  return (
    <div className="w-full p-4 text-black h-52 overflow-y-auto bg-slate-200 shadow-black shadow-md md:w-4/5 md:rounded-md md:h-40">
      {text || <span className="text-slate-500 font-thin italic">Digite algo com o teclado virtual...</span>}
    </div>
  );
}