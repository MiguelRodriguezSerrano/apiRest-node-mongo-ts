import {Request, Response, Router} from 'express';
import Blog from '../models/blog';

class BlogRoutes {

    router: Router;
    constructor () {
        this.router = Router();
        this.routes();
    }
    public async getBlogs( req: Request, res: Response): Promise <void>  {
       const blogs =  await Blog.find();
       res.json(blogs);
    }

    public async getBlog(req: Request, res: Response): Promise <void> {
        const blog = await Blog.findOne({url: req.params.url})
        console.log(req.params.url);
        res.json(blog);

        

    }

    public async createBlog(req: Request, res: Response): Promise <void> {
        //console.log(req.body);
        const {title, url, content, image} = req.body;
        const newBlog = new Blog({title, url, content, image});
        console.log(newBlog);
        await newBlog.save();
        res.json({data: newBlog});


    }
    public async updateBlog(req: Request, res: Response): Promise <void> {
        const { url } = req.params;
        const newBlog = await Blog.findOneAndUpdate({url}, req.body, {new: true});
        res.json(newBlog);

    }

    public async deleteBlog(req: Request, res: Response): Promise <void> {
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