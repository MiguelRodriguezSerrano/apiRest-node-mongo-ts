"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../models/blog"));
class BlogRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blog_1.default.find();
            res.json(blogs);
        });
    }
    getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.default.findOne({ url: req.params.url });
            console.log(req.params.url);
            res.json(blog);
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            const { title, url, content, image } = req.body;
            const newBlog = new blog_1.default({ title, url, content, image });
            console.log(newBlog);
            yield newBlog.save();
            res.json({ data: newBlog });
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const newBlog = yield blog_1.default.findOneAndUpdate({ url }, req.body, { new: true });
            res.json(newBlog);
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            yield blog_1.default.findOneAndDelete({ url });
            res.json({ response: 'Post Delete successfully' });
        });
    }
    routes() {
        this.router.get('/', this.getBlogs);
        this.router.get('/:url', this.getBlog);
        this.router.post('/', this.createBlog);
        this.router.put('/:url', this.updateBlog);
        this.router.delete('/:url', this.deleteBlog);
    }
}
const blogRoutes = new BlogRoutes();
exports.default = blogRoutes.router;
