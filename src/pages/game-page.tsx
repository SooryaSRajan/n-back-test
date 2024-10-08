import React, { useEffect, useState } from 'react';

// Props for the Instructions component
interface InstructionsProps {
    countdown: number;
}

const Instructions: React.FC<InstructionsProps> = ({ countdown }) => {
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
};

const GameComponent: React.FC = () => {
    const [characters, setCharacters] = useState<string[]>([]);
    const [solution, setSolution] = useState<boolean[]>([]); // Solution array to track true/false for main letters
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentCharacter, setCurrentCharacter] = useState<string | null>(null);
    const [answers, setAnswers] = useState<boolean[]>([]); // Track user's answers
    const [countdown, setCountdown] = useState<number>(3); // Countdown state
    const [intervalState, setIntervalState] = useState<NodeJS.Timer>(); // Countdown state

    useEffect(() => {
        const { sequence, solution } = generateCharacterArray(); // Get the sequence and solution array
        setCharacters(sequence);
        setSolution(solution);
        console.log(sequence, solution)
        setAnswers(new Array(sequence.length).fill(false)); // Initialize answers array

        // Set the first character to be displayed initially
        setCurrentCharacter(sequence[0]);

        const interval = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000); // Decrease countdown every second

        setIntervalState(interval)

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    useEffect(() => {
        if (countdown === 0 && currentIndex <= characters.length - 1) {
            setCountdown(3)
            setCurrentIndex(currentIndex => currentIndex + 1)
        }
    }, [characters.length, countdown, currentIndex]);

    useEffect(() => {
        if (currentIndex === characters.length - 1) {
            //TODO: render next component
            clearInterval(intervalState)
            setCurrentIndex(characters.length - 1)
            return;
        }
        setCurrentCharacter(characters[currentIndex])
    }, [characters, characters.length, currentIndex, intervalState]);

    useEffect(() => {
        console.log(answers)
    }, [answers]);

    const handleButtonClick = (isTrue: boolean) => {
        // Check if the user's selection matches the solution

        if (currentIndex === characters.length - 1) return;

        const isCorrect = isTrue === solution[currentIndex];

        // Update the answers array
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentIndex] = isCorrect;
            return updatedAnswers;
        });

        // Move to the next letter
        setCurrentIndex(currentIndex => currentIndex + 1)
        setCountdown(3)
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center mb-8">
                <h1 className="text-8xl font-bold text-white">{currentCharacter}</h1>
                <p className="text-2xl mt-4 text-gray-300">Letters left: {characters.length - currentIndex - 1}</p>
                <p className="text-lg text-gray-400 mt-2">Next letter in {countdown}s</p>
            </div>

            <p className="text-xl mb-4 text-gray-400">
                Is this part of the main sequence?
            </p>

            {currentIndex > 0 && (
                <div className="flex space-x-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => handleButtonClick(true)}
                    >
                        True
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleButtonClick(false)}
                    >
                        False
                    </button>
                </div>
            )}
        </div>
    );
};

// Updated generateCharacterArray function
function generateCharacterArray(): { sequence: string[], solution: boolean[] } {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];

    let sequence: string[] = [];
    let solution: boolean[] = [];

    const startIndex = Math.floor(Math.random() * (alphabet.length - 10));

    for (let i = startIndex; i < startIndex + 10; i++) {
        const mainLetter = alphabet[i];
        const randomBetweenCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 random letters

        // Push the main letter
        sequence.push(mainLetter);
        solution.push(true); // True, as it's a main letter

        // Push the random letters between the main letters
        for (let j = 0; j < randomBetweenCount; j++) {
            sequence.push(randomLetter());
            solution.push(false); // False, as these are random letters
        }

        // Repeat the main letter again
        sequence.push(mainLetter);
        solution.push(true); // True, as it's a main letter
    }

    // Limit the sequence to 20 items
    sequence = sequence.slice(0, 20);
    solution = solution.slice(0, 20);

    return { sequence, solution };
}

const GamePage: React.FC = () => {
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
