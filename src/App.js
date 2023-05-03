
import style from "./App.module.css";
import LeagueService from "./services/LeagueService"
const comando = new LeagueService()
function App() {
 async function test() {
   const matches =  await comando.getMatches()
   console.log(matches)
   return matches
  }

  test()

  return (
    // <div className={style.welcomeMessage}>
    //   Hi there 👋, <br /><br />      
    //   Welcome to your test task. <br /><br />
    //   Before you begin make sure to read the README file from the repository to make sure that your environment is properly set up. <br /><br />
    //   Also please make sure to read the challenge instructions carefully. We advice that you push your source code to the repository frequently to avoid any loss of work.<br />
    //   Once you are ready to submit the work, just go back to the challenge instructions page and click the "Submit Challenge" button.<br /><br />      
    //   Good Luck and Have Fun! 🤞<br /><br /><br /><br />
    //   <em><strong>NOTE:</strong> This page is only a welcome message and you should overwrite this page with the actuall solution implementation.</em>
    // </div>
    <div>
      {/* {console.log(test())} */}
    </div>
  );
}

export default App;
