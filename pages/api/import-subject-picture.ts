import fs from "fs";
import path from "path";

export default function handler(req: any, res: any) {
  const { file, filename } = req.body;
  const filePath = path.join(
    process.cwd(),
    "public",
    "VocabSubjectsPic",
    filename
  );
  const base64Data = file.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving image", err });
    } else {
      res.status(200).json({ message: "Image saved successfully" });
    }
  });
}
