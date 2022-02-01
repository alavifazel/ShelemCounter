
const MatchStats = (props) => {
  return (
    <tr>
      <td>{ props.claim }</td>
      <td>{ props.opponentGathered }</td>
      <td>{ props.result }</td>
    </tr>
  );
}

export default MatchStats;
