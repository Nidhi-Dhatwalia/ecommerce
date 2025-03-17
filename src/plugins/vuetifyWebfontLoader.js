import { createVuetify } from 'vuetify'

const vuetifyWebfontLoader = () => {
  const theme = {
    themes: {
      light: {
        primary: '#1976D2',  
        secondary: '#424242', 
        accent: '#82B1FF',     
      },
    },
  }
  const vuetify = createVuetify({
    theme,
    })
  return vuetify
}

export default vuetifyWebfontLoader
