import UserFakeDataEntry from "./UserFakeDataEntry";

export default interface UserJSONEntry extends UserFakeDataEntry {
  net_worth: number;
  shares: number;
  avatar_url: string;
  rank: number;
}
