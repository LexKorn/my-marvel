import AppHeader from "../appHeader/AppHeader";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <RandomChar />
      <div className="char__content">
        <CharList />
        <CharInfo />
      </div>
    </div>
  );
}

export default App;