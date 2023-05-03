/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */
import axios from "axios";
let arrayMatches = [];
class LeagueService {
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */

  setMatches(matches) {
    arrayMatches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  async getMatches() {
    await this.fetchData();
    return arrayMatches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    let sumByTeam = [];
    let namesOfTeams = [];
    // const matchesLoaded = await this.getMatches(); //luego verificar si cambiando de pestana/componente si se me borra
    //el array de la linea 10, o no, ya que dependiendo de eso voy a ejecutar esta linea o no.

    arrayMatches.forEach((match) => {
      if (match.matchPlayed) {
        if (!namesOfTeams.includes(match.homeTeam)) {
          namesOfTeams.push(match.homeTeam);
          sumByTeam.push({
            teamName: match.homeTeam,
            matchesPlayed: 1,
            goalsFor: match.homeTeamScore,
            goalsAgainst: match.awayTeamScore,
            points:
              match.homeTeamScore > match.awayTeamScore
                ? 3
                : match.homeTeamScore < match.awayTeamScore
                ? 0
                : 1,
          });
        } else {
          const indexHomeTeam = namesOfTeams.indexOf(match.homeTeam);
          sumByTeam[indexHomeTeam] = {
            ...sumByTeam[indexHomeTeam],
            matchesPlayed: sumByTeam[indexHomeTeam].matchesPlayed + 1,
            goalsFor: sumByTeam[indexHomeTeam].goalsFor + match.homeTeamScore,
            goalsAgainst:
              sumByTeam[indexHomeTeam].goalsAgainst + match.awayTeamScore,
            points:
              match.homeTeamScore > match.awayTeamScore
                ? sumByTeam[indexHomeTeam].points + 3
                : match.homeTeamScore < match.awayTeamScore
                ? sumByTeam[indexHomeTeam].points + 0
                : sumByTeam[indexHomeTeam].points + 1,
          };
        }
        if (!namesOfTeams.includes(match.awayTeam)) {
          namesOfTeams.push(match.awayTeam);
          sumByTeam.push({
            teamName: match.awayTeam,
            matchesPlayed: 1,
            goalsFor: match.awayTeamScore,
            goalsAgainst: match.homeTeamScore,
            points:
              match.awayTeamScore > match.homeTeamScore
                ? 3
                : match.awayTeamScore < match.homeTeamScore
                ? 0
                : 1,
          });
        } else {
          const indexAwayTeam = namesOfTeams.indexOf(match.awayTeam);
          sumByTeam[indexAwayTeam] = {
            ...sumByTeam[indexAwayTeam],
            matchesPlayed: sumByTeam[indexAwayTeam].matchesPlayed + 1,
            goalsFor: sumByTeam[indexAwayTeam].goalsFor + match.awayTeamScore,
            goalsAgainst:
              sumByTeam[indexAwayTeam].goalsAgainst + match.homeTeamScore,
            points:
              match.awayTeamScore > match.homeTeamScore
                ? sumByTeam[indexAwayTeam].points + 3
                : match.awayTeamScore < match.homeTeamScore
                ? sumByTeam[indexAwayTeam].points + 0
                : sumByTeam[indexAwayTeam].points + 1,
          };
        }
      }
    });
    let headToHead;

    sumByTeam.sort((i, j) =>
      i.points > j.points
        ? 1
        : i.points < j.points
        ? -1
        : (headToHead = arrayMatches.find(
            (match) =>
              match.homeTeam === i.teamName && match.awayTeam === j.teamName
          )
            ? headToHead.homeTeamScore > headToHead.awayTeamScore
              ? 1
              : headToHead.homeTeamScore < headToHead.awayTeamScore
              ? -1
              : sumByTeam[sumByTeam.indexOf(i)].goalsAgainst <
                sumByTeam[sumByTeam.indexOf(j)].goalsAgainst
              ? 1
              : sumByTeam[sumByTeam.indexOf(i)].goalsAgainst <
                sumByTeam[sumByTeam.indexOf(j)].goalsAgainst
              ? -1
              : sumByTeam[sumByTeam.indexOf(i)].goalsFor >
                sumByTeam[sumByTeam.indexOf(j)].goalsFor
              ? 1
              : sumByTeam[sumByTeam.indexOf(i)].goalsFor >
                sumByTeam[sumByTeam.indexOf(j)].goalsFor
              ? -1
              : sumByTeam[sumByTeam.indexOf(i)].teamName >
                sumByTeam[sumByTeam.indexOf(j)].teamName
              ? 1
              : -1
            : (headToHead = arrayMatches.find(
                (match) =>
                  match.awayTeam === i.teamName && match.homeTeam === j.teamName
              ))
            ? headToHead.awayTeamScore > headToHead.homeTeamScore
              ? 1
              : headToHead.awayTeamScore < headToHead.homeTeamScore
              ? -1
              : sumByTeam[sumByTeam.indexOf(i)].goalsAgainst <
                sumByTeam[sumByTeam.indexOf(j)].goalsAgainst
              ? 1
              : sumByTeam[sumByTeam.indexOf(i)].goalsAgainst <
                sumByTeam[sumByTeam.indexOf(j)].goalsAgainst
              ? -1
              : sumByTeam[sumByTeam.indexOf(i)].goalsFor >
                sumByTeam[sumByTeam.indexOf(j)].goalsFor
              ? 1
              : sumByTeam[sumByTeam.indexOf(i)].goalsFor >
                sumByTeam[sumByTeam.indexOf(j)].goalsFor
              ? -1
              : sumByTeam[sumByTeam.indexOf(i)].teamName >
                sumByTeam[sumByTeam.indexOf(j)].teamName
              ? 1
              : -1
            : null)
    );
    return sumByTeam;
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    const config = {
      headers: {
        Authorization: "Bearer YuHBdSlDXY000xa8IlCm7Qgq4_s",
      },
    };
    const url = "http://localhost:3001/api/v1/getAllMatches";
    try {
      const apiResponse = await axios.get(url, config);
      const matches = apiResponse.data.matches;
      this.setMatches(matches);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default LeagueService;
