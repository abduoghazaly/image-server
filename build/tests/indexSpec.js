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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('image API get', () => {
    it('Error Massage if no image name ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image');
        expect(response.text).toBe('please select image.');
    }));
    it('image not there Error ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '404.png' });
        expect(response.text).toBe('file not exist!');
    }));
    it('image without ext Error ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2' });
        expect(response.text).toBe('file not exist!');
    }));
    it('NaN width ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2.png', height: 300, width: '300px' });
        expect(response.text).toBe('width should be Number Only!');
    }));
    it('NaN height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2.png', height: '300px', width: 300 });
        expect(response.text).toBe('height should be Number Only!');
    }));
    it('accept only image name ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2.png' });
        expect(response.type).toBe('image/png');
    }));
    it('accept only image name and height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2.png', height: 300 });
        expect(response.type).toBe('image/png');
    }));
    it('accept only image name and width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2.png', width: 300 });
        expect(response.type).toBe('image/png');
    }));
    it('accept image name, height and width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image').query({ image: '4-2.png', height: 300, width: 300 });
        expect(response.type).toBe('image/png');
    }));
});
