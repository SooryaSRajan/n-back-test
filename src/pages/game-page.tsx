import React, {useEffect, useState} from 'react';

const Instructions = ({ countdown }: { countdown: number }) => {
    return (
        <div className="flex flex-col items-center w-full md:w-3/4 lg:w-2/3 mx-auto">
            <h4 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Instructions
            </h4>
            <p className="mb-6 text-xl font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400 text-center pb-16 text-justify">
                In the N-Back task, participants are presented a sequence of stimuli one-by-one. For each stimulus, they need to decide if the current stimulus is the same as the one presented N trials ago.
            </p>
            <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                Starting in {countdown}...
            </p>
        </div>
    );
}

const GameComponent = () => {
    return (
        <div className="text-3xl text-center">
            <p>Game Component Loaded!</p>
        </div>
    );
};

function generateCharacterArray() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];

    let sequence = [];
    const startIndex = Math.floor(Math.random() * (alphabet.length - 10)); // Ensures enough letters for 10 pairs

    // Generate sequence for 10 consecutive letters
    for (let i = startIndex; i < startIndex + 10; i++) {
        const letter = alphabet[i]; // Main letter
        const randomBetween1 = randomLetter(); // Random letter between the first pair
        const randomBetween2 = randomLetter(); // Random letter between the second pair

        // Push the pattern to the sequence array
        sequence.push(letter, randomBetween1, letter, randomBetween2);
    }

    return sequence;
}

const GamePage = () => {
    const [changePage, setChangePage] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    setChangePage(true);
                    clearInterval(interval);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);  // Countdown every 1 second

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {changePage ? <GameComponent /> : <Instructions countdown={countdown} />}
        </div>
    );
};

export default GamePage;