import './Intro.css';

interface IPropsIntro {
    onStart: () => void;
}


export const Intro = ({ onStart }: IPropsIntro) => {
    return (
        <div className='intro'>
            <h2>Vítejte v Datluj!</h2>
            <p>Pište slova všemi deseti.</p> 
            <p>Datlujte co nejrychleji, s co nejmenším počtem chyb.</p>
            <p>S každou úrovní se zvyšuje počet písmen ve slově.</p>
            <button className='start' onClick={onStart}>Začít</button>
        </div>
    )
}