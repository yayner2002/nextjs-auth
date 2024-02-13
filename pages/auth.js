import { getSession, session } from "next-auth/client";
import AuthForm from "../components/auth/auth-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  return <AuthForm />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

export default AuthPage;
