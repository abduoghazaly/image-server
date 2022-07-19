import express from "express";
import fs from "fs";
import path from "path";
import ReqQuery from "../interface/reqquery.interface";
import { imageResizer } from "../services/imageResizeService";

const imageRoute = express.Router();

imageRoute.use((req, res, next) => {
  next();
});

imageRoute.get(
  "/image",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const queries: ReqQuery = {
      image: req.query["image"],
      height: req.query["height"],
      width: req.query["width"],
    };
    if (queries.image) {
      if (fs.existsSync(path.join("image", queries?.image as string))) {
        if (!queries.width && !queries.height) {
          res.sendFile(path.resolve("image", queries?.image as string));
        } else {
          const fileName = (queries.image as string).split(".");
          if (
            fs.existsSync(
              path.join(
                "output",
                `${fileName[0]}-w${queries.width}-h${queries.height}.${fileName[1]}`
              )
            )
          ) {
            res.sendFile(
              path.resolve(
                "output",
                `${fileName[0]}-w${queries.width}-h${queries.height}.${fileName[1]}`
              )
            );
          } else {
            if (isNaN(queries.width as unknown as number) && queries.width) {
              res.send("width should be Number Only!");
            } else if (
              isNaN(queries.height as unknown as number) &&
              queries.height
            ) {
              res.send("height should be Number Only!");
            } else {
              imageResizer(queries)
                .then((e) => {
                  res.type(fileName[1]).send(e);
                })
                .catch((err) => {
                  res.send(`there was a ERROR while resize the image : ${err}`);
                });
            }
          }
        }
      } else {
        res.send("file not exist!");
      }
    } else {
      res.send("please select image.");
    }
  }
);

export default imageRoute;
