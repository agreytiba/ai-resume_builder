import { useUser } from "@clerk/nextjs";

export default function PaymentForm() {
  const { user } = useUser();

  //   if (!user) return <p>Loading...</p>;

  const userName = user?.firstName + " " + user?.lastName; // Or use user.username if available
  const email = user?.emailAddresses[0]?.emailAddress;
  return (
    <div>
      <p>User Name: {userName}</p>
      <p>Email: {email}</p>
    </div>
  );
}
