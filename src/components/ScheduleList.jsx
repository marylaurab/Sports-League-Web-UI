function ScheduleList({ arrayMatches }) {
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      }
  return (
    <div>
      <div>
        <div>Date/Time</div>
        <div>Stadium</div>
        <div>Home Team</div>
        <div>Away Team</div>
      </div>
      <div>
        {arrayMatches?.map((match, i) => (
            
          <div key={i}>
           
            <div>{formatDate(match.matchDate)}</div>
            <div>{match.stadium}</div>
            <div>
              <div>{match.homeTeam}</div>
              <img
                src={`${match.homeTeam}.png`}
                alt={`${match.homeTeam} flag`}
              />
            </div>
            <div>{`${match.homeTeamScore} : ${match.awayTeamScore}`}</div>
            <div>
              <img
                src={`${match.homeTeam}.png`}
                alt={`${match.homeTeam} flag`}
              />
              <div>{match.awayTeam}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleList;
