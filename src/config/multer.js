import multer from 'multer';
import crypto from 'crypto';

import { extname, resolve } from 'path';

export default multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'storage','uploads'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res)=> {
            if(err) return;
            return cb(null, res.toString('hex') + extname(file.originalname));
        });
    },
});