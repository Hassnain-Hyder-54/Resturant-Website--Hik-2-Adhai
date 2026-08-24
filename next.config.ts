import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  agentRules: false,
  // Keep the requested src/pages module folder as component source rather
  // than treating its .jsx files as legacy Pages Router entries.
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
