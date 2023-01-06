<script lang="ts" setup>
import { getNodeList, installNodeVersion, type NvmListStatus } from '@/cmd/nvm';
import { IconLeft } from '@arco-design/web-vue/es/icon';
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type WatchStopHandle,
} from 'vue';

const version = ref('');
const installStatus = ref(false);
let stopVersionWatch: WatchStopHandle;
const isInstall = ref(false);
const list = ref<NvmListStatus[]>([]);

const install = async () => {
  if (version.value) {
    if (await confirm(`确认安装: v${version.value} ?`)) {
      installStatus.value = true;
      const res = await installNodeVersion(version.value);
      installStatus.value = false;
      alert(res);
      list.value = await getNodeList();
      isInstall.value = list.value.some(it => {
        if (it.version === version.value) {
          return true;
        } else if (it.version.startsWith(version.value)) {
          if (it.version.endsWith('.0')) {
            return true;
          }
        }
        return false;
      });
    }
  }
};

onMounted(async () => {
  list.value = await getNodeList();
  stopVersionWatch = watch(version, val => {
    isInstall.value = list.value.some(it => {
      if (it.version === val) {
        return true;
      } else if (it.version.startsWith(val)) {
        if (it.version.endsWith('.0')) {
          return true;
        }
      }
      return false;
    });
  });
});

onBeforeUnmount(() => {
  stopVersionWatch();
});
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
          <a-button
            type="primary"
            @click="install"
            :disabled="isInstall"
            :loading="installStatus"
            >{{
              installStatus ? '安装中...' : isInstall ? '已安装' : '安装'
            }}</a-button
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
