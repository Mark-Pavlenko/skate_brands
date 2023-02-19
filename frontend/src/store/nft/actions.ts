import { API_ENDPOINT } from "@/constants/api";
import axios from "axios";

export const FETCH_USER_NFTS = async function (
  { state }: { state: any },
  walletAddress: String
) {
  const result = await axios.get(
    `${API_ENDPOINT}/v1/wallet/${walletAddress}/nft`
  );
  state.data = result.data;
};
