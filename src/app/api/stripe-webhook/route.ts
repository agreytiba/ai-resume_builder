// import { env } from "@/env";
// import prisma from "@/lib/prisma";
// import stripe from "@/lib/stripe";
// import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
// import Stripe from "stripe";

export async function Get(req: NextRequest) {
  try {
    console.log(req);
    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}

// async function handleSessionCompleted(session: Stripe.Checkout.Session) {
//   const userId = session.metadata?.userId;

//   if (!userId) {
//     throw new Error("User ID is missing in session metadata");
//   }

//   await (
//     await clerkClient()
//   ).users.updateUserMetadata(userId, {
//     privateMetadata: {
//       stripeCustomerId: session.customer as string,
//     },
//   });
// }

// async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
//   const subscription = await stripe.subscriptions.retrieve(subscriptionId);

//   if (
//     subscription.status === "active" ||
//     subscription.status === "trialing" ||
//     subscription.status === "past_due"
//   ) {
//     await prisma.userSubscription.upsert({
//       where: {
//         userId: subscription.metadata.userId,
//       },
//       create: {
//         userId: subscription.metadata.userId,
//         stripeSubscriptionId: subscription.id,
//         stripeCustomerId: subscription.customer as string,
//         stripePriceId: subscription.items.data[0].price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000,
//         ),
//         stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
//       },
//       update: {
//         stripePriceId: subscription.items.data[0].price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000,
//         ),
//         stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
//       },
//     });
//   } else {
//     await prisma.userSubscription.deleteMany({
//       where: {
//         stripeCustomerId: subscription.customer as string,
//       },
//     });
//   }
// }

// async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
//   await prisma.userSubscription.deleteMany({
//     where: {
//       stripeCustomerId: subscription.customer as string,
//     },
//   });
// }
