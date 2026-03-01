// Total stars across all repos
export const getTotalStars = (repos) => {
  if (!repos || repos.length === 0) return 0;

  return repos.reduce((total, repo) => {
    return total + repo.stargazers_count;
  }, 0);
};

// Most used language
export const getMostUsedLanguage = (repos) => {
  if (!repos || repos.length === 0) return null;

  const languageCount = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  let max = 0;
  let mostUsed = null;

  for (const language in languageCount) {
    if (languageCount[language] > max) {
      max = languageCount[language];
      mostUsed = language;
    }
  }

  return mostUsed;
};

// Top starred repository
export const getTopStarredRepo = (repos) => {
  if (!repos || repos.length === 0) return null;

  return repos.reduce((topRepo, currentRepo) => {
    return currentRepo.stargazers_count > topRepo.stargazers_count
      ? currentRepo
      : topRepo;
  });
};

export const sortRepositories = (repos, criteria) => {
  if (!repos || repos.length === 0) return [];

  const sorted = [...repos]; // avoid mutating original

  switch (criteria) {
    case "stars":
      return sorted.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );

    case "forks":
      return sorted.sort(
        (a, b) => b.forks_count - a.forks_count
      );

    case "updated":
      return sorted.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );

    default:
      return repos;
  }
};

export const getUniqueLanguages = (repos) => {
  if (!repos || repos.length === 0) return [];

  const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];

  return languages;
};