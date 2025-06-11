<template>
  <section>
    <h2 class="text-h4 mb-4">{{ collection.title }}</h2>
    <v-slide-group
      show-arrows
      class="pa-4"
    >
      <v-slide-group-item
        v-for="item in collection.items"
        :key="item.id"
        v-slot="{ toggle }"
      >
        <div class="me-4">
          <slot name="item" :item="item" :toggle="toggle" @details="navigateToActor"></slot>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </section>
</template>

<script setup lang="ts">
import { ActorViewModel } from '@/core/domain/entities/Actor';
import { Collection } from '@/core/domain/entities/Collection';
import { useRouter } from 'vue-router';


interface Props {
  collection: Collection<any>
}

const router = useRouter()

const navigateToActor = (actor: ActorViewModel) => {
  console.log('navigateToActor', actor);
  
  router.push({ name: 'ActorDetails', params: { id: actor.id }})
}

defineProps<Props>()
</script>