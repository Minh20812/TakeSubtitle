const express = require("express");
const { exec } = require("child_process");
const app = express();

app.get("/download-subtitle", (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send("Missing video URL");
  }

  // Command to download subtitles using yt-dlp
  const command = `yt-dlp --write-sub --sub-lang en --skip-download -o - ${videoUrl}`;

  exec(command, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send("Failed to download subtitle");
    }

    // Assuming the subtitle is in stdout (depends on the yt-dlp setup)
    res.setHeader("Content-Disposition", 'attachment; filename="subtitle.srt"');
    res.setHeader("Content-Type", "text/plain");
    res.send(stdout);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
