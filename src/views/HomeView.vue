<script setup lang="tsx">
import {
  getNodeList,
  setNodeVersion,
  type NvmListStatus,
  uninstallNodeVersion,
} from '@/cmd/nvm';
import {
  IconCheckCircleFill,
  IconPlayCircleFill,
  IconDownload,
  IconCloseCircleFill,
  IconCloud,
} from '@arco-design/web-vue/es/icon';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const nvmList = ref<NvmListStatus[]>([]);

let timer: number;

const changeNvmList = async () => {
  try {
    const res = await getNodeList();
    nvmList.value = res;
    timer = setTimeout(() => {
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

onBeforeUnmount(() => {
  clearTimeout(timer);
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
  <div class="header">
    <a-space>
      <a-button @click="$router.replace('/install')" type="primary">
        <template #icon>
          <icon-download />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>安装</template>
      </a-button>
      <a-button @click="$router.replace('/change-source')" type="primary">
        <template #icon>
          <icon-cloud />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>换源</template>
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
  color: #3498db;
}
.arco-icon-close-circle-fill {
  font-size: 28px;
  stroke-width: 5;
  color: #e74c3c;
}
</style>
