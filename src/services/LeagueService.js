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
  async getLeaderboard() {
    let teams = [];
    const matchesLoaded = await this.getMatches(); //luego verificar si cambiando de pestana/componente si se me borra
    //el array de la linea 10, o no, ya que dependiendo de eso voy a ejecutar esta linea o no.

    matchesLoaded.forEach((match) => {
      if (match.matchPlayed) {
        const indexHomeTeam = teams.indexOf((team) => team.teamName === match.homeTeam);
        if (indexHomeTeam !== -1) {
          teams[indexHomeTeam] = {
            ...teams[indexHomeTeam],
            matchesPlayed: teams[indexHomeTeam].matchesPlayed + 1,
            goalsFor: teams[indexHomeTeam].goalsFor + match.homeTeamScore,
            goalsAgainst: teams[indexHomeTeam].goalsAgainst + match.awayTeamScore,
            points:
              match.matchPlayed > match.awayTeamScore
                ? teams[indexHomeTeam].points + 3
                : match.matchPlayed < match.awayTeamScore
                ? teams[indexHomeTeam].points + 0
                : teams[indexHomeTeam].points + 1,
          };
        } else {
            teams[indexHomeTeam] = {
                teamName: match.homeTeam,
                matchesPlayed:1,
                goalsFor: match.homeTeamScore,
                goalsAgainst: match.awayTeamScore,
                points:
                  match.matchPlayed > match.awayTeamScore
                    ? teams[indexHomeTeam].points + 3
                    : match.matchPlayed < match.awayTeamScore
                    ? teams[indexHomeTeam].points + 0
                    : teams[indexHomeTeam].points + 1,
              };

        }
      }
    });
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
