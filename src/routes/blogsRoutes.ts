import {Request, Response, Router} from 'express';
import Blog from '../models/blog';

class BlogRoutes {

    router: Router;
    constructor () {
        this.router = Router();
        this.routes();
    }
    async getBlogs( req: Request, res: Response)   {
       const blogs =  await Blog.find();
       res.json(blogs);
    }

    async getBlog(req: Request, res: Response) {
        const blog = await Blog.findOne({url: req.params.url})
        console.log(req.params.url);
        res.json(blog);

        

    }

    async createBlog(req: Request, res: Response) {
        //console.log(req.body);
        const {title, url, content, image} = req.body;
        const newBlog = new Blog({title, url, content, image});
        console.log(newBlog);
        await newBlog.save();
        res.json({data: newBlog});


    }
    async updateBlog(req: Request, res: Response) {
        const { url } = req.params;
        const newBlog = await Blog.findOneAndUpdate({url}, req.body, {new: true});
        res.json(newBlog);

    }

    async deleteBlog(req: Request, res: Response) {
        const { url } = req.params;
        await Blog.findOneAndDelete({url});
        res.json({response: 'Post Delete successfully'});
        

    }

    routes() {
        this.router.get('/', this.getBlogs);
        this.router.get('/:url', this.getBlog);
        this.router.post('/', this.createBlog);
        this.router.put('/:url', this.updateBlog);
        this.router.delete('/:url', this.deleteBlog);

    }
}


const blogRoutes =  new BlogRoutes();
export default blogRoutes.router;