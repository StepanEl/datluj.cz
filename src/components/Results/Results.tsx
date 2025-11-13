import './Results.css';


interface IResultsProps {
  level: number;
  wordsCompleted: number;
  mistakes: number;
  time: string; 
}


const Results = ({ level, wordsCompleted, mistakes, time}: IResultsProps) => {
  return (
    <div className="results">   
        <h2>Dodatlováno!</h2>
        <p>Splněno úrovní: {level} / 16</p>
        <p>Napsaných slov: {wordsCompleted}</p>
        <p>Chyb: {mistakes}</p>
        <p>Konečný čas: {time}</p>
        <img src="thumb.png" alt="Palec nahoru" className="thumb" />
    </div>
  );
};

export default Results; 