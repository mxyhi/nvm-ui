<script setup lang="tsx">
import {
  getNodeList,
  setNodeVersion,
  type NvmListStatus,
  uninstallNodeVersion,
} from '@/shell/nvm';
import {
  IconCheckCircleFill,
  IconPlayCircleFill,
  IconDownload,
  IconCloseCircleFill,
} from '@arco-design/web-vue/es/icon';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const nvmList = ref<NvmListStatus[]>([]);

const changeNvmList = async () => {
  try {
    const res = await getNodeList();
    nvmList.value = res;
    const timer = setTimeout(() => {
      changeNvmList();
      clearTimeout(timer);
    }, 2000);
  } catch (error) {
    alert('请安装nvm');
  }
};

onMounted(async () => {
  changeNvmList();
});

const useIt = async (version: string) => {
  if (await confirm(`确认切换到: v${version} ?`)) {
    const res = await setNodeVersion(version);
    alert(res);
  }
};

const uninstallVersion = async (version: string) => {
  if (!version) return;
  if (await confirm(`确认卸载: v${version} ?`)) {
    const res = await uninstallNodeVersion(version);
    alert(res);
  }
};
</script>

<template>
  <RouterView></RouterView>
  <div class="header">
    <a-space>
      <a-button @click="$router.replace('/install')" type="primary">
        <template #icon>
          <icon-download />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>安装</template>
      </a-button>
    </a-space>
  </div>
  <a-list hoverable class="body">
    <a-list-item v-for="it in nvmList" :key="it.version">
      <a-list-item-meta :title="it.version"> </a-list-item-meta>
      <template #actions>
        <div>
          <icon-check-circle-fill v-if="it.current" />
          <icon-play-circle-fill
            v-if="!it.current"
            @click="useIt(it.version)"
          />
          <icon-close-circle-fill @click="uninstallVersion(it.version)" />
        </div>
      </template>
    </a-list-item>
  </a-list>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  background: #fff;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.body {
  margin-top: 52px;
}
.arco-icon-check-circle-fill {
  font-size: 28px;
  stroke-width: 5;
  color: #27ae60;
}
.arco-icon-play-circle-fill {
  font-size: 28px;
  stroke-width: 5;
  color: #27ae60;
}
.arco-icon-close-circle-fill {
  font-size: 28px;
  stroke-width: 5;
  color: #e74c3c;
}
</style>
