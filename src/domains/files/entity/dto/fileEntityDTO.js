
export default class FileEntityDTO {
    id = null;
    name;
    path;
    isDir = false;
    extension = '';
    size = 0;
    creationDate = '';
    modificationDate = '';
    isImage = false;

    constructor(name, path, isDir = false) {
        this.name = name;
        this.path = path;
        this.isDir = isDir;
    }

    setId(value) {
        this.id = value;
    }

    setExtension(value) {
        this.extension = value;
    }

    setIsImage(value) {
        this.isImage = value;
    }

    setSize(value) {
        this.size = value;
    }

    setCreationDate(value) {
        this.creationDate = value;
    }

    setModificationDate(value) {
        this.modificationDate = value;
    }

}
