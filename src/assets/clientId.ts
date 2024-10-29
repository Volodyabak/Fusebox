import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});
export const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "farcaster",
        "passkey",
        "email",
        "phone",
        "discord",
        "telegram",
      ],
    },
  }),
  createWallet("walletConnect"),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.trustwallet.app"),
];
