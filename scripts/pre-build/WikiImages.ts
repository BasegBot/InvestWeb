import path from "path";
import fs from "fs-extra";
import fg from "fast-glob";
import IScriptParams from "../../interfaces/IScriptParams";

export default async function execute(params: IScriptParams) {
  // delete all files in /public/img/wiki/
  const publicImgWikiPath = path.join(process.cwd(), "public/img/wiki");
  try {
    if (fs.existsSync(publicImgWikiPath)) {
      const files = fs.readdirSync(publicImgWikiPath);
      for (const file of files) {
        fs.unlinkSync(path.join(publicImgWikiPath, file));
      }
    } else {
      fs.mkdirSync(publicImgWikiPath, { recursive: true });
    }
  } catch (e) {
    throw new Error("Please delete all files in /public/img/wiki/ manually.");
  }

  // recursively retrieve all /img folder paths in working directory/InvestWiki/wiki/
  const wikiImgPaths = await fg("**/img", {
    cwd: path.join(process.cwd(), "InvestWiki/wiki"),
    onlyDirectories: true,
    absolute: false,
  });
  // copy all image directories to /public/img/wiki/
  for (const wikiImgPath of wikiImgPaths) {
    const srcPath = path.join(process.cwd(), "InvestWiki/wiki", wikiImgPath);
    const destPath = path.join(process.cwd(), "public/img/wiki", wikiImgPath);
    fs.mkdirSync(destPath, { recursive: true });
    const files = fs.readdirSync(srcPath);
    for (const file of files) {
      console.log(
        "copying",
        path.join(srcPath, file),
        "to",
        path.join(destPath, file)
      );
      try {
        fs.copySync(path.join(srcPath, file), path.join(destPath, file), {
          overwrite: false,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}
