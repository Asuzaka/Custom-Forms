import { GithubIcon } from "lucide-react";

const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_GITHUB_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_FRONTEND_URL}/github/callback&scope=user:email`;

export function GitHubLoginButton() {
  return (
    <a href={githubAuthUrl}>
      <button className="flex w-[254px] cursor-pointer items-center justify-center gap-5 rounded-sm border border-gray-200 px-8 py-1.5">
        <GithubIcon />
        <span>Login with GitHub</span>
      </button>
    </a>
  );
}
