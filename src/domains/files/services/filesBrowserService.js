import {filesApi} from '@/api';

export class FilesBrowserService {
    async scanDir(dir){
        const list =  await filesApi.scanDir(dir);
        console.log('list', list.data);
        return list;
    }
}
