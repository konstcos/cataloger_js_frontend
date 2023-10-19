<template>
  <div
      :class="{folder: file.isDir}"
      class="icons_block_item mb-1"
      :style="itemStyle"
  >
    <div v-if="file.isImage" class="image_block" :style="imageBlockStyle">
      <img alt="" :src="iconImage" class="image" @error="imageLoadingFailed">
    </div>
    <div v-else class="icon" :style="iconStyle">
      <v-icon v-if="file.isDir" icon="mdi:mdi-folder"/>
      <v-icon v-else icon="mdi:mdi-file-document"/>
    </div>

    <div class="label">{{ file.name }}</div>

  </div>
</template>

<script>
import imageNotFoundStub from '@/assets/image_not_found.png'
// import answers from "@/domains/core/answers/answers.json";
import {FilesBrowserRepository} from "@/domains/files/repository/filesBrowserRepository";

export default {
  name: "IconsViewItemComponent",
  setup() {
    const filesBrowserRepository = new FilesBrowserRepository();
    return {filesBrowserRepository};
  },
  props: {
    file: {
      required: true,
      default: null
    },
    itemStyle: {
      default: null,
    },
    iconStyle: {
      default: null,
    }
  },
  data() {
    return {
      iconLoading: false,
      iconImage: imageNotFoundStub,
    };
  },
  computed: {
    imageBlockStyle() {
      return {
        width: `${parseInt(this.itemStyle.width) - 20}px`,
        height: `${parseInt(this.itemStyle.height) -20}px`,
      };
    },
  },
  methods: {
    getImageFromEntity() {
      if (!this.file.isImage) {
        return '';
      }
      this.iconImage = this.filesBrowserRepository.getDirectImageUrl(this.file);
    },
    imageLoadingFailed() {
      this.iconImage = imageNotFoundStub;
    }
  },
  mounted() {
    this.getImageFromEntity();
  }
}
</script>

<style scoped lang="scss">

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

  .image_block {
    //width: 150px;
    //height: 150px;

    .image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .horizontal {
      width: 100%;
      height: auto;
    }

    .vertical {
      width: auto;
      height: 100%;
    }
  }

}
</style>
