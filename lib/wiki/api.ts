import { default as pathlib } from "path";
import fg from "fast-glob";
import fs from "fs";
import matter from "gray-matter";

const wikiDir = pathlib.join(process.cwd(), "InvestWiki/wiki");

const getAllFiles = (path: string) => {
  const files = fg.sync("**/*.md", {
    cwd: path,
    onlyFiles: true,
    absolute: false,
  });
  return files;
};

function getAllWikiPaths() {
  const files = getAllFiles(wikiDir);
  // manipulate array entries, remove the .md extension and move it to the front of the string
  const paths = files.map((file: string) => {
    const path = file.replace(".md", "");
    // move the last part of the path to the front
    const pathParts = path.split("/");
    const lastPart = pathParts.pop();
    if (lastPart) {
      pathParts.unshift(lastPart);
    }
    return pathParts.join("/");
  });
  return paths;
}

function getWikiPath(lang: string, path: string) {
  const files = getAllFiles(wikiDir);
  // filter the files to only include the ones in the path
  const pageFiles = files.filter(
    (file) => file.split("/").slice(0, -1).join("/") === path
  );

  let pagePath = "";
  // do https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.ts
  if (pageFiles.length !== 0) {
    // check if there is a file with the language code
    const langFile = pageFiles.find((file) => file.includes(`${lang}.md`));
    if (langFile) {
      pagePath = langFile;
    } else {
      // otherwise, use the english file if it exists, otherwise return the first file
      pagePath =
        pageFiles.find((file) => file.includes("en.md")) ?? pageFiles[0];
    }
  }
  return pagePath;
}

function getWikiContent(lang: string, path: string) {
  // get the path to the file
  const relativePath = getWikiPath(lang, path);
  if (!relativePath) {
    return null;
  }
  const filePath = pathlib.join(wikiDir, relativePath);
  // read the file
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

export { getWikiPath, getAllWikiPaths, getWikiContent };
