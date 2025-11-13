import { useEffect, useState } from 'react';
import Wordbox from '../Wordbox/Wordbox';
import wordList from '../../word-list';
import './Stage.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import Timer from '../Timer/Timer';
import Results from '../Results/Results';
import { Intro } from '../Intro/Intro';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return "";
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    generateWord(3),
    generateWord(3),
    generateWord(3)]);
  const [mistakes, setMistakes] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [wordLength, setWordLength] = useState<number>(3);
  const [wordsCompleted, setWordsCompleted] = useState<number>(0);
  const [time, setTime] = useState<number>(0)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [isStarted, setIsStarted] = useState<boolean>(false)

  const handleFinish = () => {
    setWordsCompleted(n => {
      const next = n + 1;

      if (next % 10 === 0 && level < 16) {
        setLevel(x => x + 1);
        setWordLength(x => x + 1);
      }

      if (level === 16 && next % 10 === 0) {
        setIsFinished(true);
      }

      return next;
    });

    setWords((x) => [
      ...x.slice(1),
      generateWord(wordLength)])
  }

  useEffect(() => {
    setWords([
      generateWord(wordLength),
      generateWord(wordLength),
      generateWord(wordLength)
    ]);
  }, [level]);


  const handleMistake = () => {
    setMistakes(x => x + 1)
  }

  return (
    <div className="stage">
      <div className='timer'>
        {!isFinished && isStarted && <Timer onTick={(t) => setTime(t)} />}
         {formatTime(time)}
      </div>
      <ProgressBar level={level} />
      <h2>Úroveň: {level} / 16</h2>
      <div className="stage__mistakes">
        <p>Napsaných slov: {wordsCompleted}</p>
        Chyb: {mistakes}
      </div>

      {!isStarted && (
        <div className="overlay">
          <Intro onStart={() => setIsStarted(true)} />
        </div>
      )}

      <div className="stage__words">
        {words.map((word, index) =>
          <Wordbox
            word={word}
            key={index}
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistake} />)}
      </div>

      {isFinished && (
        <div className="overlay">
          <Results
            level={level}
            wordsCompleted={wordsCompleted}
            mistakes={mistakes}
            time={formatTime(time)}
          />
        </div>
      )
      }
    </div>

  );
};

export default Stage;
