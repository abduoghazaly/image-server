"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imageResizeService_1 = require("../services/imageResizeService");
const imageRoute = express_1.default.Router();
imageRoute.use((req, res, next) => {
    next();
});
imageRoute.get('/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queries = req.query;
    if (queries.image) {
        if (fs_1.default.existsSync(path_1.default.join('image', queries === null || queries === void 0 ? void 0 : queries.image))) {
            if (!queries.width && !queries.height) {
                res.sendFile(path_1.default.resolve('image', queries === null || queries === void 0 ? void 0 : queries.image));
            }
            else {
                const fileName = queries.image.split('.');
                if (fs_1.default.existsSync(path_1.default.join('output', `${fileName[0]}-w${queries.width}-h${queries.height}.${fileName[1]}`))) {
                    res.sendFile(path_1.default.resolve('output', `${fileName[0]}-w${queries.width}-h${queries.height}.${fileName[1]}`));
                }
                else {
                    if (isNaN(queries.width) && queries.width) {
                        res.send('width should be Number Only!');
                    }
                    else if (isNaN(queries.height) && queries.height) {
                        res.send('height should be Number Only!');
                    }
                    else {
                        (0, imageResizeService_1.imageResizer)(queries)
                            .then((e) => {
                            res.type(fileName[1]).send(e);
                        }).catch(err => {
                            res.send(`there was a ERROR while resize the image : ${err}`);
                        });
                    }
                }
            }
        }
        else {
            res.send('file not exist!');
        }
    }
    else {
        res.send('please select image.');
    }
}));
exports.default = imageRoute;
