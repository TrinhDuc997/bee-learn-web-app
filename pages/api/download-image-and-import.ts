import { NextApiResponse, NextApiRequest } from "next";
import fs from "fs";
import path from "path";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl, filename } = req.body;
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data, "binary");
  const filePath = path.join(
    process.cwd(),
    "public",
    "VocabSubjectsPic",
    filename
  );
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save image" });
      return;
    }

    res.status(200).json({ message: "Image saved successfully" });
  });
}
