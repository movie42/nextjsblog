import fs from "fs";
import path from "path";
import graymatter from "gray-matter";

export const readFile = () => {
  const dir = path.resolve("./__posts");
  const readFiles = fs.readdirSync(dir);

  const files = readFiles.map((file) => {
    const data = fs.readFileSync(`./__posts/${file}`, "utf8");
    const meta = graymatter(data);

    return { meta };
  });

  return files;
};
