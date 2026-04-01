/**
 * Git integration for ctxlens budget strategies.
 *
 * Provides functions to list files that have been modified or staged
 * in the current git working tree. Used by the `budget` command's
 * `--strategy changed` and `--strategy staged` modes.
 */

import { execFileSync } from "node:child_process";

/**
 * Returns relative paths of files modified in the working tree
 * (both staged and unstaged, excluding deleted files).
 */
export function getChangedFiles(rootPath: string): string[] {
  try {
    const output = execFileSync("git", ["diff", "--name-only", "--diff-filter=d", "HEAD"], {
      cwd: rootPath,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return output.trim().split("\n").filter(Boolean);
  } catch {
    // Not a git repo or no commits yet — try without HEAD
    try {
      const output = execFileSync("git", ["diff", "--name-only", "--diff-filter=d"], {
        cwd: rootPath,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });
      return output.trim().split("\n").filter(Boolean);
    } catch {
      return [];
    }
  }
}

/**
 * Returns relative paths of files staged for commit
 * (excluding deleted files).
 */
export function getStagedFiles(rootPath: string): string[] {
  try {
    const output = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=d"], {
      cwd: rootPath,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return output.trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
}
