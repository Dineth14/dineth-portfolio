export interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/Dineth14/repos?sort=updated&per_page=10",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("GitHub API error");
    return await res.json();
  } catch {
    return [];
  }
}
