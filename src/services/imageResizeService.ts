import path from "path";
import sharp from "sharp";

export async function imageResizer(queries) {
  const fileName = (queries.image as string).split(".");
  const width = queries.width
    ? Number.parseInt(queries.width as unknown as string, 0)
    : undefined;
  const height = queries.height
    ? +(queries.height as unknown as number)
    : undefined;
  return await sharp(path.join("image", queries?.image as string))
    .resize({ width, height })
    .toFile(
      path.join(
        "output",
        `${fileName[0]}-w${queries.width}-h${queries.height}.${fileName[1]}`
      ),
      () => {
        // error and info
      }
    )
    .toBuffer();
}
