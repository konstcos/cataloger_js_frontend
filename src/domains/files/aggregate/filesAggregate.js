import FileEntity from "@/domains/files/entity/fileEntity";
import FileEntityDTO from "@/domains/files/entity/dto/fileEntityDTO";

export class FilesAggregate {
    currentFolder;
    contents = [];
    filteredContents = [];
    filters = {
        showHiddenFiles: false,
    };

    constructor(fileEntityDTO, filters = null) {
        this.currentFolder = new FileEntity(fileEntityDTO);
        this.setFilters(filters);
    }

    add(fileEntityDTO) {
        this.contents.push(
            new FileEntity(fileEntityDTO)
        );
        this.makeFiltration();
        this.sortFolderItems();
    }

    getEntitiesOfParts() {
        const result = [];
        let path = this.currentFolder.path;
        let next = true;
        while (next) {
            const parts = path.split('/').filter(Boolean);

            const dirName = parts.pop();
            path = '/' + parts.join('/');

            let dto = null;
            if (dirName) {
                dto = new FileEntityDTO(dirName, path, true);
            } else {
                dto = new FileEntityDTO('root', '/', true);
            }

            result.unshift(
                new FileEntity(dto)
            )

            if (parts.length < 1) {
                next = false;
            }
        }

        return result;
    }

    makeFiltration() {
        if (this.contents.length === 0) {
            this.filteredContents = [];
            return;
        }

        this.filteredContents = this.contents;

        if (!this.filters.showHiddenFiles) {
            this.filteredContents = this.filteredContents.filter((item) => item.name.charAt(0) !== '.')
        }
    }

    sortFolderItems() {
        this.filteredContents.sort((a, b) => {
           if (a.isDir && !b.isDir) return -1;
           if (!a.isDir && b.isDir) return 1;
           return 0;
        });
    }

    showHiddenFiles(show) {
        this.filters.showHiddenFiles = show === true;
        this.makeFiltration();
        this.sortFolderItems();
    }

    switchHiddenFilesShow() {
        this.showHiddenFiles(
            !this.filters.showHiddenFiles
        );
    }

    get isShowHiddenFiles() {
        return this.filters.showHiddenFiles;
    }

    get filtersData() {
        return this.filters;
    }

    setFilters(filters) {
        if (filters === null || typeof filters !== 'object') {
            return;
        }

        for (const item in this.filters) {
            if (item in filters) {
                this.filters[item] = filters[item];
            }
        }
    }
}
