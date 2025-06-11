import { container } from '@/infrastructure/ioc/container'

export function useInjection<T>(type: symbol): T {
  return container.get<T>(type)
}