const express = require("express");
const multer = require("multer");
const cors = require("cors");
const libre = require("libreoffice-convert");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("Vui lòng tải lên file Word!");

  const inputPath = req.file.path;
  const outputPath = `${inputPath}.pdf`;

  fs.readFile(inputPath, (err, data) => {
    if (err) return res.status(500).send("Lỗi khi đọc file!");

    libre.convert(data, ".pdf", undefined, (err, converted) => {
      if (err) return res.status(500).send("Lỗi khi chuyển đổi file!");

      fs.writeFileSync(outputPath, converted);
      res.download(outputPath, "converted.pdf", () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend chạy tại http://localhost:${PORT}`));
