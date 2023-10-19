import {filesApi} from "@/api";
import {responder} from "@/utils/responder";
import {FilesAggregate} from "@/domains/files/aggregate/filesAggregate";
import answers from "@/domains/core/answers/answers.json"
import FileEntityDTO from "@/domains/files/entity/dto/fileEntityDTO";
import settings from '@/settings'

export class FilesBrowserRepository {

    /**
     * Получение списка файлов и папок из указанной директории
     *
     * @param dir
     * @param filters
     * @returns {Promise<Answer>}
     */
    async scanDir(dir, filters = null){
        try {
            const result =  await filesApi.scanDir(dir);
            if (result.status === 200) {
                return responder.success(
                    answers.GENERAL.SUCCESS,
                    {
                        files: this.prepareFilesList(result.data.files, filters),
                    }
                );
            }

            return responder.fail(
                answers.GENERAL.ERROR_UNKNOWN,
                {
                    status: result.status,
                }
            );

        } catch(e) {
            return responder.fail(
                answers.GENERAL.ERROR_SERVER,
                {
                    error: e,
                }
            );
        }
    }

    getDirectImageUrl(fileEntity) {
        return `${settings.baseUrl}/files/image?path=${fileEntity.fullPath()}`;
    }

    /**
     * Подготовка файлов
     * преобразования списка файлов в список энтити файлов
     *
     * @param filesObject
     * @param filters
     */
    prepareFilesList(filesObject, filters) {

        const dto = new FileEntityDTO(filesObject.currentFolder.name, filesObject.currentFolder.path, filesObject.currentFolder.isDir);
        const filesAggregate = new FilesAggregate(dto, filters)

        for (const file of filesObject.contents) {
            const dto = new FileEntityDTO(file.name, file.path, file.isDir);
            dto.setExtension(file.extension);
            dto.setIsImage(file.isImage);
            filesAggregate.add(dto);
        }

        return filesAggregate;
    }
}
