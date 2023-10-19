<template>
  <div>
    <h1>Файловый менеджер</h1>

    <div v-if="files">
      <span>
        Скрытые файлы
        <v-btn
            size="x-small"
            @click="files.switchHiddenFilesShow()"
        >
          {{ files.isShowHiddenFiles ? 'Спрятать' : 'Показать' }}
        </v-btn>
      </span>
      <span class="ml-3">
        Отобразить
        <v-btn
            size="x-small"
            @click="switchView()"
        >
          {{ view === viewsVariants.icons ? 'Списком' : 'Иконками' }}
        </v-btn>
      </span>
      <div>
        <v-slider
          v-model="iconSizeIndex"
          :min="0"
          :max="300"
          :step="5"
        ></v-slider>
      </div>
      <div class="mb-3 mt-2 dir_breadcrumbs">

        <span
            v-for="dir of this.path"
            :key="dir.name"
            @click="changeDir(dir)"
            class="dir_breadcrumb_item"
        >
          {{ dir.name }} /
        </span>
        <span
            class="dir_breadcrumb_item_current"
        >
          {{ files.currentFolder.name }}
        </span>

        <v-btn
            size="x-small"
            :loading="loading"
            @click=reloadDir()
            icon="mdi:mdi-reload"
            class="ml-2"
        >
        </v-btn>


      </div>
      <div v-if="view === viewsVariants.icons" class="icons_block">
        <IconsViewItemComponent
            v-for="file in files.filteredContents"
            :key="file.name"
            :file="file"
            :item-style="itemStyle"
            :icon-style="iconStyle"
            @click="changeDir(file)"
        />
      </div>
      <div v-else class="list_block">
        <div
            v-for="file of files.filteredContents"
            :key="file.name"
            @click="changeDir(file)"
            :class="{folder: file.isDir}"
            class="list_block_item mb-1"
        >
          <v-icon v-if="file.isDir" icon="mdi:mdi-folder"/>
          <v-icon v-else icon="mdi:mdi-file-document"/>
          <span class="ml-2">{{ file.name }}</span>

        </div>
      </div>

    </div>
    <div v-else>
      ошибка сервера
    </div>

  </div>
</template>

<script>
import {FilesBrowserRepository} from "@/domains/files/repository/filesBrowserRepository";
import answers from "@/domains/core/answers/answers.json"
import imageNotFoundStub from '@/assets/image_not_found.png'
import IconsViewItemComponent from "@/domains/files/components/files_explorer/IconsViewItemComponent.vue";

export default {
  name: "FileExplorerComponent",
  setup() {
    const filesBrowserRepository = new FilesBrowserRepository();
    return {filesBrowserRepository};
  },
  components: {
    IconsViewItemComponent,
  },
  data() {
    return {
      imageNotFoundStub: imageNotFoundStub,
      loading: false,
      files: null,
      viewsVariants: {
        list: 'list',
        icons: 'icons'
      },
      view: 'icons',
      iconItemSize: {
        width: 250,
        height: 180,
        originWidth: 250,
        originHeight: 180,
      },
      path: [],
      error: [],
      iconSizeIndex: 10,
    }
  },
  computed: {
    itemStyle() {
      return {
        width: `${this.iconItemSize.width}px`,
        height: `${this.iconItemSize.height}px`,
      };
    },
    iconStyle() {
      const iconSize = Math.min(this.iconItemSize.width, this.iconItemSize.height) * 0.6
      return {
        fontSize: `${iconSize}px`,
      };
    }
  },
  watch: {
    iconSizeIndex(val) {
      this.iconItemSize.width = this.iconItemSize.originWidth + val;
      this.iconItemSize.height = this.iconItemSize.originHeight + val;
    }
  },
  methods: {
    async scanFiles(dirPath = '~/') {
      this.clearError();
      this.loading = true;
      const answer = await this.filesBrowserRepository.scanDir(
          dirPath,
          this.files ? this.files.filtersData : null
      );

      if (answer.is(answers.GENERAL.SUCCESS)) {
        this.files = answer.data.files;
        this.path = this.files.getEntitiesOfParts();
      } else {
        this.error = answer.description;
      }

      this.loading = false;
    },
    changeDir(entity) {
      if (!entity.isDir) {
        return;
      }
      this.scanFiles(entity.fullPath());
    },
    switchView() {
      if (this.view === this.viewsVariants.icons) {
        this.view = this.viewsVariants.list;
      } else {
        this.view = this.viewsVariants.icons;
      }
    },
    clearError() {
      this.error = [];
    },

    reloadDir() {
      if (!this.files || typeof this.files !== 'object') {
        this.scanFiles();
        return;
      }
      this.scanFiles(this.files.currentFolder.fullPath());
    }
  },
  mounted() {
    this.scanFiles();
  }
}
</script>


<style scoped lang="scss">

.dir_breadcrumbs {
  font-size: 18px;
  font-weight: bold;

  .dir_breadcrumb_item {
    cursor: pointer;
    color: #2a9ef5;

    &:hover {
      color: #a6d6ff;
    }
  }

  .dir_breadcrumb_item_current {
    cursor: default;
    color: #a6d6ff;
  }
}

.list_block {
  color: white;
  margin-left: 15px;

  .list_block_item {
    font-size: 14px;
    cursor: pointer;

    &.folder {
      color: #2a9ef5;
      font-weight: bold;
    }

    &:hover {
      color: #a6d6ff;
    }
  }

}

.table_block {
  color: white;
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;

  .list_block_item {
    font-size: 14px;
    cursor: pointer;
    flex: 1;
    min-width: calc(33.333% - 20px);
    margin: 10px;

    &.folder {
      color: #2a9ef5;
      font-weight: bold;
    }

    &:hover {
      color: #a6d6ff;
    }
  }
}

.icons_block {
  color: white;
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;

  .icons_block_item {
    font-size: 14px;
    cursor: pointer;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    &.folder {
      color: #2a9ef5;
      font-weight: bold;
    }

    &:hover {
      color: #a6d6ff;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;

    }

    .label {
      text-align: center;
    }

  }
}

</style>
