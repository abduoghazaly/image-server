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
exports.imageResizer = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
function imageResizer(queries) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = queries.image.split('.');
        const width = queries.width ? Number.parseInt(queries.width, 0) : undefined;
        const height = queries.height ? +queries.height : undefined;
        return yield (0, sharp_1.default)(path_1.default.join('image', queries === null || queries === void 0 ? void 0 : queries.image))
            .resize({ width, height })
            .toFile(path_1.default.join('output', `${fileName[0]}-w${queries.width}-h${queries.height}.${fileName[1]}`), (err) => {
            if (err) {
                console.log(err);
            }
        }).toBuffer();
    });
}
exports.imageResizer = imageResizer;
