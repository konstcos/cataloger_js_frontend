export default class FileEntity {

    id = null;
    name;
    path;
    isDir;
    extension;
    size;
    creationDate;
    modificationDate;
    isImage;

    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.path = dto.path;
        this.isDir = dto.isDir;
        this.extension = dto.extension;
        this.size = dto.size;
        this.creationDate = dto.creationDate;
        this.modificationDate = dto.modificationDate;
        this.isImage = dto.isImage;
    }

    fullPath() {

        if (this.name === 'root') {
            return '/';
        }

        if (this.path === '/') {
            return `/${this.name}`;
        }

        return `${this.path}/${this.name}`;
    }

    // isImage() {
    //     if (this.isDir) {
    //         return false;
    //     }
    //     if (this.extension === 'jpg' || this.extension === 'jpeg') {
    //         return true;
    //     }
    //     if (this.extension === 'png') {
    //         return true;
    //     }
    //
    //     return false;
    // }
}
