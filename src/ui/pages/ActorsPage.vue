<template>
  <v-container fluid class="pa-0">
    <v-container>
      
      <LoaderOverlay v-if="loading" :show="loading" />

      <div v-else-if="error" class="text-center py-16">
        <v-alert type="error" variant="tonal">{{ error }}</v-alert>
      </div>

      <template v-else>
        <FeaturedContentActor
          :collection="featuredActor"
          :loading="loading"
          @details="navigateToActor"
        />

        <div class="filters mb-16">
          <v-chip-group v-model="selectedType">
            <v-chip
              filter
              variant="elevated"
              :value="null"
            >
              Tout
            </v-chip>
            <v-chip
              v-for="type in actorTypes"
              :key="type"
              filter
              variant="elevated"
              :value="type"
            >
              {{ formatActorType(type) }}
            </v-chip>
          </v-chip-group>
        </div>

        <ActorCarousel
          v-for="(group, type) in groupedActors"
          :key="type"
          :collection="{
            title: formatActorType(type),
            items: group
          }"
          @details="navigateToActor"
          class="mb-16"
        />
      </template>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ActorViewModel } from '@/core/domain/entities/Actor'
import { ActorTypeViewType } from '@/core/domain/entities/ActorType'
import { createActorCollection } from '@/core/domain/entities/Collection'
import ActorCarousel from '@/ui/components/features/actors/ActorCarousel.vue'
import FeaturedContentActor from '@/ui/components/features/actors/FeaturedContentActor.vue'
import LoaderOverlay from '@/ui/components/shared/LoaderOverlay.vue'
import { useActors } from '@/ui/composables/actors/useActor'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { actors, loading, error, fetchActors } = useActors()
const selectedType = ref<ActorTypeViewType | null>(null)

const actorTypes: ActorTypeViewType[] = [
  'rappeur',
  'producteur',
  'realisateur',
  'beatmaker',
  'media',
  'radio',
  'guest'
]

const featuredActor = computed(() => 
  createActorCollection(
    'featured',
    'À la une',
    actors.value?.slice(0, 3) || []
  )
)

const groupedActors = computed(() => {
  const filtered = selectedType.value
    ? actors.value.filter(a => a.actorType === selectedType.value)
    : actors.value

  return filtered.reduce((acc, actor) => {
    if (!acc[actor.actorType]) {
      acc[actor.actorType] = []
    }
    acc[actor.actorType].push(actor)
    return acc
  }, {} as Record<ActorTypeViewType, ActorViewModel[]>)
})

const formatActorType = (type: string): string => {
  const translations: Record<string, string> = {
    rappeur: 'Rappeurs',
    producteur: 'Producteurs',
    realisateur: 'Réalisateurs',
    beatmaker: 'Beatmakers',
    media: 'Médias',
    radio: 'Radios',
    guest: 'Invités'
  }
  return translations[type] || type.charAt(0).toUpperCase() + type.slice(1)
}

const navigateToActor = (actor: ActorViewModel) => {
  router.push({ name: 'ActorDetails', params: { id: actor.id }})
}

onMounted(async () => {
  await fetchActors()
})
</script>

<style scoped lang="scss">
.filters {
  position: sticky;
  top: 64px;
  z-index: 4;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  padding: 16px 0;
}
</style>