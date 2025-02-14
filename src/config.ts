import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { scrollSepolia } from "viem/chains";

const config = getDefaultConfig({
  appName: "Alpha",
  projectId: "YOUR_PROJECT_ID",
  chains: [scrollSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
