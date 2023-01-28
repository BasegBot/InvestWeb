import UserAsset from "./UserAsset";
import UserBadge from "./UserBadge";

export default interface UserFakeDataEntry {
  id: number;
  name: string;
  points: number;
  daily_change: number;
  daily_change_percent: number;
  assets: UserAsset[];
  badges: UserBadge[];
}
