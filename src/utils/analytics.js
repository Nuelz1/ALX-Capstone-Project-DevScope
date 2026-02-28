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