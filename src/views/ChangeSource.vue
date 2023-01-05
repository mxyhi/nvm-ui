<script lang="ts" setup>
import {
  resetNodeMirror,
  resetNpmMirror,
  setNodeMirror,
  setNpmMirror,
} from '@/cmd/nvm';
import { IconLeft } from '@arco-design/web-vue/es/icon';
import { ref } from 'vue';

const nodeMirror = ref('');
const npmMirror = ref('');
const status = ref(false);

const replaceMirror = async (type: number) => {
  if (type === 0) {
    if (!nodeMirror.value) return;
    if (!(await confirm('确认更换?'))) return;
    status.value = true;
    const res = await setNodeMirror(nodeMirror.value);
    status.value = false;
    alert('完成');
  } else if (type === 1) {
    if (!npmMirror.value) return;
    if (!(await confirm('确认更换?'))) return;
    status.value = true;
    const res = await setNpmMirror(npmMirror.value);
    status.value = false;
    alert('完成');
  }
};

const resetMirror = async (type: number) => {
  if (!(await confirm('确认重置?'))) return;
  if (type === 0) {
    status.value = true;
    const res = await resetNodeMirror();
    status.value = false;
    alert('完成');
  } else if (type === 1) {
    status.value = true;
    const res = await resetNpmMirror();
    status.value = false;
    alert('完成');
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
          :disabled="status"
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
          placeholder="请输入node源,不填为默认镜像"
          allow-clear
          v-model.trim="nodeMirror"
        />
        <div class="submit_box">
          <a-space>
            <a-button type="primary" @click="replaceMirror(0)" :loading="status"
              >更换</a-button
            >
            <a-button type="primary" @click="resetMirror(0)" :loading="status"
              >重置</a-button
            >
          </a-space>
        </div>
        <a-input
          placeholder="请输入npm源,不填为默认镜像"
          allow-clear
          v-model.trim="npmMirror"
        />
        <div class="submit_box">
          <a-space>
            <a-button type="primary" @click="replaceMirror(1)" :loading="status"
              >更换</a-button
            >
            <a-button type="primary" @click="resetMirror(1)" :loading="status"
              >重置</a-button
            >
          </a-space>
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
