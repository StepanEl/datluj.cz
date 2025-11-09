import Stage from './components/Stage/Stage';
import Timer from './components/Timer/Timer';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <img src="computer-1293390_640.png" alt="Datluj.cz logo" className="logo" />
      <Stage />
    </div>
  );
};

export default App;