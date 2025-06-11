import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      height: '48px',
      padding: '0 20px',
      variants: {
        flat: {
          elevation: 0,
        },
        elevated: {
          elevation: 2,
        },
        plain: {
          opacity: 0.8,
          textTransform: 'none',
        }
      },
      sizes: {
        'x-small': {
          padding: '0 8px',
          height: '20px',
        },
        'small': {
          padding: '0 12px',
          height: '28px',
        },
        'large': {
          padding: '0 24px',
          height: '56px',
        },
      },
    }
  },
  theme: {
    defaultTheme: 'netflixTheme',
    themes: {
      netflixTheme: {
        dark: true,
        colors: {
          primary: '#E50914',
          secondary: '#fff',
          accent: '#1867C0',
          background: '#141414',
          surface: '#1f1f1f',
          'surface-bright': '#2f2f2f',
          'on-surface-variant': '#ffffff',
        }
      }
    }
  }
})