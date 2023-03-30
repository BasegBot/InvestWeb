import NextAuth from "next-auth/next";
import TwitchProvider from "next-auth/providers/twitch";
import {
  MongoDBAdapter,
  MongoDBAdapterOptions,
} from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export const dbOptions: MongoDBAdapterOptions = {
  collections: {
    Users: "web_users",
    Accounts: "web_accounts",
    Sessions: "web_sessions",
  },
};

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise, dbOptions),
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID ?? "",
      clientSecret: process.env.TWITCH_SECRET ?? "",
    }),
  ],
});
