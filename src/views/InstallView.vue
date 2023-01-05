<script lang="ts" setup>
import { installNodeVersion } from '@/cmd/nvm';
import { IconLeft } from '@arco-design/web-vue/es/icon';
import { ref } from 'vue';

const version = ref('');
const installStatus = ref(false);

const install = async () => {
  if (version.value) {
    if (await confirm(`确认安装: v${version.value} ?`)) {
      installStatus.value = true;
      const res = await installNodeVersion(version.value);
      installStatus.value = false;
      alert(res);
    }
  }
};
</script>

<template>
  <a-layout class="container">
    <a-layout-header class="header">
      <a-space>
        <a-button
          size="mini"
          type="outline"
          @click="$router.replace('/')"
          :disabled="installStatus"
        >
          <template #icon>
            <icon-left />
          </template>
        </a-button> </a-space
    ></a-layout-header>
    <a-divider />
    <a-layout-content class="body">
      <a-space direction="vertical" fill>
        <a-input
          class="version_input"
          placeholder="请输入版本号: 例: 16.16.0"
          allow-clear
          v-model.trim="version"
        />
        <div class="submit_box">
          <a-button type="primary" @click="install" :loading="installStatus"
            >安装</a-button
          >
        </div>
      </a-space>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    padding: 8px;
    height: 20px;
    .arco-icon-left {
      font-size: 22px;
    }
  }
  .body {
    margin: 0 10px;
    .submit_box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
