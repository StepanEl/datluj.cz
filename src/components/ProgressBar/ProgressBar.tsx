import './ProgressBar.css';

interface IProgressBarProps {
  level: number;
}

const ProgressBar= ({ level }: IProgressBarProps) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: 16}).map((_, index) => (
        <div
          key={index}
          className={`dot ${index < level ? 'active' : ''} ${index === (level-1) ? 'current' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;