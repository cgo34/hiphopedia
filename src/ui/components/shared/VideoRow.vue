<template>
    <div class="video-row">
      <h2>{{ title }}</h2>
      <div class="videos-slider">
        <div class="video-card" v-for="video in videos" :key="video.id">
          <img :src="video.thumbnailUrl" :alt="video.title" />
        </div>
      </div>
    </div>
  </template>
  
  <style lang="scss">
  .video-row {
    margin-bottom: 3vw;
  
    h2 {
      font-size: 1.4vw;
      margin-bottom: 0.5em;
    }
  
    .videos-slider {
      display: flex;
      gap: 0.2vw;
      overflow-x: auto;
      padding: 0.5em 0;
  
      &::-webkit-scrollbar {
        display: none;
      }
  
      .video-card {
        flex: 0 0 16.66666667%;
        transition: transform 0.3s;
  
        img {
          width: 100%;
          border-radius: 4px;
        }
  
        &:hover {
          transform: scale(1.5);
          z-index: 2;
        }
      }
    }
  }
  </style>