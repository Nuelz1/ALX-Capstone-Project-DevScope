export const calculateTotalStars = (repos) => {
  return repos.reduce((total, repo) => {
    return total + repo.stargazers_count;
  }, 0);
};

export const getTopStarredRepo = (repos) => {
  if (!repos.length) return null;

  return repos.reduce((top, repo) => {
    return repo.stargazers_count > top.stargazers_count
      ? repo
      : top;
  }, repos[0]);
};

export const getMostUsedLanguage = (repos) => {
  const languageCount = {};

  repos.forEach((repo) => {
    if (!repo.language) return;

    languageCount[repo.language] =
      (languageCount[repo.language] || 0) + 1;
  });

  let topLanguage = null;
  let max = 0;

  for (const language in languageCount) {
    if (languageCount[language] > max) {
      max = languageCount[language];
      topLanguage = language;
    }
  }

  return topLanguage;
};