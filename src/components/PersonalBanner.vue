<script setup>
/**
 * 顶部个人风格展示区
 * 后续可通过 props 传入图片与文字内容
 */
defineProps({
  imageSrc: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="personal-banner">
    <div class="personal-banner__inner">
      <div class="personal-banner__media">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt || title || 'banner image'"
          class="personal-banner__image"
        />
        <div v-else class="personal-banner__image-placeholder">
          <span class="personal-banner__placeholder-icon"></span>
          <span class="personal-banner__placeholder-text">图片区域</span>
        </div>
      </div>

      <div class="personal-banner__text">
        <h2 v-if="title" class="personal-banner__title">{{ title }}</h2>
        <p v-else class="personal-banner__title personal-banner__title--placeholder">
          标题文字
        </p>

        <p v-if="subtitle" class="personal-banner__subtitle">{{ subtitle }}</p>
        <p v-else class="personal-banner__subtitle personal-banner__subtitle--placeholder">
          副标题或一段介绍文字
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.personal-banner {
  width: 100%;
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(
    135deg,
    rgba(66, 184, 131, 0.08) 0%,
    rgba(66, 184, 131, 0.02) 50%,
    transparent 100%
  );
  border-bottom: 1px solid var(--color-border);
}

.personal-banner__inner {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  max-width: 720px;
  margin: 0 auto;
}

.personal-banner__media {
  flex-shrink: 0;
}

.personal-banner__image,
.personal-banner__image-placeholder {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-lg);
  object-fit: cover;
}

.personal-banner__image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  background: var(--color-surface);
  border: 2px dashed var(--color-border);
  color: var(--color-text-secondary);
}

.personal-banner__placeholder-icon {
  width: 36px;
  height: 28px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  position: relative;
  opacity: 0.5;
}

.personal-banner__placeholder-icon::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
}

.personal-banner__placeholder-icon::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 10px;
  border-top: 2px solid var(--color-border);
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  transform: skewY(-8deg);
}

.personal-banner__placeholder-text {
  font-size: 12px;
}

.personal-banner__text {
  flex: 1;
  min-width: 0;
}

.personal-banner__title {
  margin: 0 0 var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
}

.personal-banner__title--placeholder {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.personal-banner__subtitle {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.personal-banner__subtitle--placeholder {
  opacity: 0.7;
}

@media (max-width: 480px) {
  .personal-banner__inner {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-lg);
  }

  .personal-banner__image,
  .personal-banner__image-placeholder {
    width: 100px;
    height: 100px;
  }
}
</style>
