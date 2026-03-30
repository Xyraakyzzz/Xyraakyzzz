export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    res.status(400).json({ error: "Username tidak boleh kosong" });
    return;
  }
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    if (data.message === "Not Found") {
      res.status(404).json({ error: "User GitHub tidak ditemukan" });
      return;
    }
    res.status(200).json({
      username: data.login,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    });
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan pada API" });
  }
}
