import logo from './logo.svg';
import MatchStats from './MatchStats';
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [claim, setClaim] = useState(0);
  const [message, setMessage] = useState();
  const [matches, setMatches] = useState([]);
  const [firstPlayerGroupScore, setFirstPlayerGroupScore] = useState(0);
  const [secondPlayerGroupScore, setSecondPlayerGroupScore] = useState(0);
  const [playersGroup, setPlayersGroup] = useState([1,0]);

  const clear = (e) => {
      window.location.reload(false);
  }

  const handleClaim = (e) => {
    e.preventDefault();
    var claim = e.target.claim.value;
    if(claim < 100 || claim > 165 || claim % 5 != 0) {
        setMessage("Invalid value!");
    } else {
        setMessage(null);
        setClaim(claim);
    }
  }
  const handleGathered = (e) => {
    e.preventDefault();
    var opVal = parseInt(e.target.gatheredValue.value);
    var won;
    if(opVal < 0 || opVal > 65 || opVal % 5 != 0) {
        setMessage("Invalid value!");
    } else {
        if(parseInt(claim) + opVal < 165) {
            won = true;
            if(playersGroup[0] == 1) {
                setFirstPlayerGroupScore(firstPlayerGroupScore + (165 - opVal));
                setSecondPlayerGroupScore(secondPlayerGroupScore + opVal);
            } else {
                setSecondPlayerGroupScore(secondPlayerGroupScore + (165 - opVal));
                setFirstPlayerGroupScore(firstPlayerGroupScore + opVal);
            }
        } else {
            won = false;
            if(playersGroup[0] == 1) {
                setFirstPlayerGroupScore(firstPlayerGroupScore - parseInt(claim));
                setSecondPlayerGroupScore(secondPlayerGroupScore + opVal);
            } else {
                setSecondPlayerGroupScore(secondPlayerGroupScore - parseInt(claim));
                setFirstPlayerGroupScore(firstPlayerGroupScore + opVal);
            }
      }
      if(won) {
          setMatches(oldArray => [...oldArray, <MatchStats claim={claim} opponentGathered={opVal} result="Won" />]);
      } else {
          setMatches(oldArray => [...oldArray, <MatchStats claim={claim} opponentGathered={opVal} result="Lost" />]);
      }
      setMessage(null);
      setClaim(0);
      }
  }
  return (
    <div id="container">
      <div id="panel">
        <lable htmlFor="firstPlayerGroup">1st: </lable>
        <input
          type="radio"
          id="secondPlayerGroup"
          name="firstPlayerGroup"
          checked={playersGroup[0] == 1}
          onClick={() =>setPlayersGroup([1, 0])}
        />
        <lable htmlFor="secondPlayerGroup">2nd: </lable>
        <input
          type="radio"
          id="secondPlayerGroup"
          name="secondPlayerGroup"
          checked={playersGroup[1] == 1}
          onClick={() =>setPlayersGroup([0, 1])}
        />
        { claim === 0 &&
          <form onSubmit={handleClaim}>
             <label htmlFor="claim">Claim:</label>
             <label htmlFor="#">&nbsp;</label>
             <input type="text" name="claim" />
             <button>Click</button>
          </form>
        }
        { claim !== 0 &&
          <form onSubmit={handleGathered}>
             <label htmlFor="opponentGathered">Gathered:</label>
             <input type="text" name="gatheredValue" />
             <button>Click</button>
           </form>
        }
        <p className="error-message">{message}</p>
        <form onSubmit={clear}>
           <button id="submit-button">Clear</button>
        </form>
      </div>
      <div id="history">
        <table>
          {matches}
          <tr>
            { firstPlayerGroupScore != 0 &&
              <td class="result" style={{color: "green"}}>{ firstPlayerGroupScore }</td>
            }
            { secondPlayerGroupScore != 0 &&
              <td class="result" style={{color: "green"}}>{ secondPlayerGroupScore }</td>
            }
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
