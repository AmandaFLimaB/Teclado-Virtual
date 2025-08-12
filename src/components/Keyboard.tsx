import { useState, useEffect, useRef } from "react";

type KeyboardProps = {
    onKeyPress: (key: string) => void;
};

export default function Keyboard({ onKeyPress }: KeyboardProps) {
    const [isShift, setIsShift] = useState(false);
    const [isCapsLock, setIsCapsLock] = useState(false);

    const keyRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const toggleShift = () => setIsShift((prev) => !prev);
    const toggleCapsLock = () => setIsCapsLock((prev) => !prev);

    const applyCase = (char: string, shift: boolean, capsLock: boolean) => {
        const upper = capsLock !== shift;
        return upper ? char.toUpperCase() : char.toLowerCase();
    };

    const getRefKey = (key: string) => {
        const map: { [key: string]: string } = {
            " ": "Space",
            Enter: "Enter",
            Backspace: "Backspace",
            Tab: "Tab",
            CapsLock: "Caps Lock",
            Shift: "Shift",
        };
        const mapped = map[key] || key;
        return mapped.length === 1 ? mapped.toUpperCase() : mapped;
    };

    const handleKeyClick = (key: string) => {
        if (key === "Shift") {
            toggleShift();
        } else if (key === "Caps Lock") {
            toggleCapsLock();
        } else {
            let output = key;

            const shift = isShift;
            const capsLock = isCapsLock;

            if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
                output = applyCase(key, shift, capsLock);
            }

            if (key === "Space") output = " ";
            if (key === "Tab") output = "\t";
            if (key === "Enter") output = "\n";

            onKeyPress(output);

            // Desativa shift após uma tecla (comportamento normal)
            if (isShift && key !== "Shift") {
                setIsShift(false);
            }
        }
    };



    const rows = [
        ["Tab", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Caps Lock", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
        ["Shift", ",", ".", ";", "'", "-", "+", "/", "=", "Enter"],
        ["Space"],
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            const refKey = getRefKey(e.key);
            const button = keyRefs.current[refKey];

            // Usa o estado real do sistema para caps lock/shift
            const isCaps = e.getModifierState("CapsLock");
            const isShiftActive = e.shiftKey;

            let key = refKey;

            if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
                key = applyCase(key, isShiftActive, isCaps);
            }

            if (refKey === "Backspace") {
                onKeyPress("Backspace");
            } else if (refKey === "Enter") {
                onKeyPress("\n");
            } else if (refKey === "Tab") {
                onKeyPress("\t");
            } else if (refKey === "Space") {
                onKeyPress(" ");
            } else if (key.length === 1) {
                onKeyPress(key);
            }

            if (button) {
                button.style.backgroundColor = "white";
                button.style.color = "#2B2B2B";

                setTimeout(() => {
                    button.style.backgroundColor = "";
                    button.style.color = "";
                }, 200);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onKeyPress]);

    return (
        <div className="mt-4 flex flex-col w-full max-w-full bg-[#2B2B2B] border border-black md:w-4/5 md:p-6 md:gap-2 md:rounded-md shadow-black shadow-2xl">
            {rows.map((row, i) => (
                <div key={i} className="flex justify-center flex-wrap md:gap-2">
                    {row.map((key) => {
                        const displayKey =
                            key.length === 1 && /^[a-zA-Z]$/.test(key)
                                ? applyCase(key, isShift, isCapsLock)
                                : key === "Space"
                                    ? " "
                                    : key;

                        return (
                            <button
                                key={key}
                                ref={(el) => {
                                    if (el) {
                                        const refKey = getRefKey(key);
                                        keyRefs.current[refKey] = el;
                                    }
                                }}
                                onClick={() => handleKeyClick(key)}
                                className={`
                                    text-sm font-semibold min-w-8 min-h-10 text-center grow hover:scale-95 transition shadow-black shadow-md text-white drop-shadow-lg
                                    md:rounded-md md:px-4 md:min-w-[38px] md:min-h-[38px] md:py-2 
                                    hover:border hover:border-white hover:font-black
                                    active:bg-white active:text-[#2B2B2B] 
                                    `}
                            >


                                {displayKey}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
