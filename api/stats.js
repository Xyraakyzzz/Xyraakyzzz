export default async function handler(req, res) {
  const username = req.query.username || "Xyraakyzzz";
  const theme = req.query.theme || "aura";
  const hide_border = req.query.hide_border === "true";
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    if (data.message === "Not Found") {
      res.status(404).send("User not found");
      return;
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "image/svg+xml");
    const svg = `
<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="200" fill="${theme === 'aura' ? '#8e44ad' : '#2c3e50'}" ${hide_border ? '' : 'stroke="#fff" stroke-width="4"'}/>
  <text x="50" y="60" font-size="30" fill="#fff">Username: ${data.login}</text>
  <text x="50" y="110" font-size="30" fill="#fff">Repos: ${data.public_repos}</text>
  <text x="50" y="160" font-size="30" fill="#fff">Followers: ${data.followers}</text>
</svg>
`;
    res.status(200).send(svg);
  } catch (err) {
    res.status(500).send("Error fetching GitHub stats");
  }
}
