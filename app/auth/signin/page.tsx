import SignInComponent from "@/app/components/SignInComponent";
import { getProviders } from "next-auth/react";
import Image from "next/image";

const SignInPage = async () => {
  const providers = await getProviders();
  return (
    <div className="grid justify-center">
      <Image
        src="https://links.papareact.com/161"
        alt="Profile Picture"
        className="rounded-full mx-2 object-cover"
        width={700}
        height={700}
      />
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
