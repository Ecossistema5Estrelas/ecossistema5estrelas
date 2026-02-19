export type AllowedCommand =
  | { kind: "node_script"; id: "list-posts"; script: string; args?: string[] };

export const ALLOWLIST: Record<string, AllowedCommand> = {
  "list-posts": {
    kind: "node_script",
    id: "list-posts",
    script: "scripts/editorial/list-posts.mjs",
    args: [],
  },
};
