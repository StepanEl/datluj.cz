import { useEffect, useState } from 'react';
import Wordbox from '../Wordbox/Wordbox';
import wordList from '../../word-list';
import './Stage.css';
import ProgressBar from '../ProgressBar/ProgressBar';

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

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    generateWord(3),
    generateWord(3),
    generateWord(3)]);
  const [mistakes, setMistakes] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [wordLength, setWordLength] = useState<number>(3);
  const [wordsCompleted, setWordsCompleted] = useState<number>(0);


  const handleFinish = () => {
    setWordsCompleted(n => {
      const next = n + 1;

      if (next % 10 === 0 && level < 16) {
        setLevel(x => x + 1);
        setWordLength(x => x + 1);
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
      <ProgressBar level={level} />
      <h2>Úroveň: {level}</h2>
      <div className="stage__mistakes">
        <p>Správně napsaná slova: {wordsCompleted}</p>
        Chyb: {mistakes}
      </div>
      <div className="stage__words">
        {words.map((word, index) =>
          <Wordbox
            word={word}
            key={index}
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistake} />)}
      </div>
    </div>
  );
};

export default Stage;
