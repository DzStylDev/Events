import Header from "./Header";
import ProfileContainer from "./ProfileContainer";
import Sorties from "./Sorties";

export default function Profile(){

  return (
    <>
      <div className="container">
            < Header />
            < ProfileContainer />
            < Sorties />
      </div>
    </>
  );
}