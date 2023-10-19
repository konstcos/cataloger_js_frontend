import request from '@/utils/request';
import routes from '../routes';

export default {
    async scanDir(dir='.'){
        return await request.post(routes.scanDir, {
            dir,
        });
    },

    async getFileImage(path){
        return await request.get(`${routes.fileImage}?path=${path}` );
    },
}
