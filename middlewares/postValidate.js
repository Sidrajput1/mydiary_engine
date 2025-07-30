import {body,param,query} from 'express-validator';

export const createPostValidation =[
    body('title', 'Title is required').notEmpty(),
    // body('slug', 'Slug is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
   // body('excerpt', 'Excerpt is required').optional().notEmpty(),
   // body('author', 'Author is required').notEmpty(),
    body('status', 'Status must be either draft or published').isIn(['draft', 'published']).optional(),
    // body('categories', 'Categories must be an array of strings').optional().isArray().custom((value) => {
    //     value.forEach((item) => {
    //         if (typeof item !== 'string') {
    //             throw new Error('Each category must be a string');
    //         }
    //     });
    //     return true;
    // }),
    // body('tags', 'Tags must be an array of strings').optional().isArray().custom((value) => {
    //     value.forEach((item) => {
    //         if (typeof item !== 'string') {
    //             throw new Error('Each tag must be a string');
    //         }
    //     });
    //     return true;
    // }),
    // body('featuredImage', 'Featured image URL is required').optional().isURL()
];

export const updatePostValidation = [
    param('id','Invalid post ID').isMongoId(),
body('title').optional().notEmpty(),
body('content').optional().notEmpty(),
body('status').optional().isIn(['draft','published']),

];

export const getPostsValidation = [
query('page').optional().isInt({ min:1 }),
query('limit').optional().isInt({ min:1 }),
query('status').optional().isIn(['draft','published']),
];