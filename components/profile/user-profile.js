import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {

  const passwordChangeHandler = async (passwordData) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

  }

  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);
  // const [session, setSession] = useState();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       setIsLoading(false);
  //       setSession(session);
  //     } else {
  //       window.location.href = "/auth";
  //     }
  //   });
  // }, []); // [] = only run once when component is mounted

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }



  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onPasswordChange={passwordChangeHandler}/>
    </section>
  );
}

export default UserProfile;
