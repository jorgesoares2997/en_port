import fs from 'fs'
import path from 'path'

// Tipos para as traduções
interface TranslationValue {
  [key: string]: string | TranslationValue
}

interface TranslationData {
  [key: string]: TranslationValue
}

// Função para carregar arquivo JSON
function loadTranslationFile(filePath: string): TranslationValue {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    const fileContent = fs.readFileSync(fullPath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    throw new Error(`Erro ao carregar arquivo ${filePath}: ${error}`)
  }
}

// Função para obter o valor de uma chave aninhada
function getNestedValue(obj: TranslationValue, keyPath: string): string | TranslationValue | undefined {
  const keys = keyPath.split('.')
  let current: TranslationValue | string | undefined = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && current[key] !== undefined) {
      current = current[key]
    } else {
      return undefined
    }
  }
  
  return current
}

// Função para traduzir uma chave
function translateKey(translations: TranslationValue, key: string): string {
  const value = getNestedValue(translations, key)
  return typeof value === 'string' ? value : key
}

describe('Translation Utils', () => {
  const languages = ['en', 'pt', 'es']
  const translationData: TranslationData = {}
  
  beforeAll(() => {
    // Carrega todos os arquivos de tradução
    languages.forEach(lang => {
      const filePath = `src/messages/${lang}.json`
      translationData[lang] = loadTranslationFile(filePath)
    })
  })
  
  test('deve carregar arquivos de tradução corretamente', () => {
    languages.forEach(lang => {
      expect(translationData[lang]).toBeDefined()
      expect(typeof translationData[lang]).toBe('object')
      expect(Object.keys(translationData[lang]).length).toBeGreaterThan(0)
    })
  })
  
  test('deve obter valores aninhados corretamente', () => {
    const testData: TranslationValue = {
      Navbar: {
        home: 'Home',
        about: 'About'
      },
      Home: {
        title: 'Welcome'
      }
    }
    
    expect(getNestedValue(testData, 'Navbar.home')).toBe('Home')
    expect(getNestedValue(testData, 'Navbar.about')).toBe('About')
    expect(getNestedValue(testData, 'Home.title')).toBe('Welcome')
    expect(getNestedValue(testData, 'Navbar.inexistente')).toBeUndefined()
    expect(getNestedValue(testData, 'Inexistente.key')).toBeUndefined()
  })
  
  test('deve traduzir chaves corretamente', () => {
    const testTranslations: TranslationValue = {
      Navbar: {
        home: 'Início',
        about: 'Sobre'
      },
      Home: {
        title: 'Bem-vindo'
      }
    }
    
    expect(translateKey(testTranslations, 'Navbar.home')).toBe('Início')
    expect(translateKey(testTranslations, 'Navbar.about')).toBe('Sobre')
    expect(translateKey(testTranslations, 'Home.title')).toBe('Bem-vindo')
    expect(translateKey(testTranslations, 'ChaveInexistente')).toBe('ChaveInexistente')
  })
  
  test('deve traduzir chaves de navegação em todos os idiomas', () => {
    const navigationKeys = ['Navbar.home', 'Navbar.about', 'Navbar.projects', 'Navbar.contact']
    
    languages.forEach(lang => {
      navigationKeys.forEach(key => {
        const translation = translateKey(translationData[lang], key)
        expect(translation).toBeDefined()
        expect(typeof translation).toBe('string')
        expect(translation.trim().length).toBeGreaterThan(0)
        expect(translation).not.toBe(key) // Não deve retornar a chave original
      })
    })
  })
  
  test('deve traduzir títulos principais em todos os idiomas', () => {
    const titleKeys = ['Home.title', 'About.title', 'Projects.title', 'Contact.title']
    
    languages.forEach(lang => {
      titleKeys.forEach(key => {
        const translation = translateKey(translationData[lang], key)
        expect(translation).toBeDefined()
        expect(typeof translation).toBe('string')
        expect(translation.trim().length).toBeGreaterThan(0)
        expect(translation).not.toBe(key) // Não deve retornar a chave original
      })
    })
  })
  
  test('deve ter traduções consistentes entre idiomas', () => {
    const testKeys = [
      'Navbar.home',
      'Navbar.about',
      'Navbar.projects',
      'Navbar.contact',
      'Home.title',
      'Contact.sendMessage'
    ]
    
    testKeys.forEach(key => {
      const translations = languages.map(lang => translateKey(translationData[lang], key))
      
      // Todas as traduções devem existir
      translations.forEach(translation => {
        expect(translation).toBeDefined()
        expect(typeof translation).toBe('string')
        expect(translation.trim().length).toBeGreaterThan(0)
      })
      
      // As traduções devem ser diferentes entre idiomas (exceto para chaves inexistentes)
      if (translations.every(t => t !== key)) {
        const uniqueTranslations = new Set(translations)
        expect(uniqueTranslations.size).toBeGreaterThan(1) // Pelo menos 2 traduções diferentes
      }
    })
  })
  
  test('deve lidar com chaves inexistentes graciosamente', () => {
    const inexistentKeys = [
      'ChaveInexistente',
      'Navbar.inexistente',
      'Home.inexistente',
      'Inexistente.key'
    ]
    
    languages.forEach(lang => {
      inexistentKeys.forEach(key => {
        const translation = translateKey(translationData[lang], key)
        expect(translation).toBe(key) // Deve retornar a chave original
      })
    })
  })
  
  test('deve ter estrutura de dados válida', () => {
    languages.forEach(lang => {
      const data = translationData[lang]
      
      // Verifica se tem as seções principais
      expect(data).toHaveProperty('Navbar')
      expect(data).toHaveProperty('Home')
      expect(data).toHaveProperty('About')
      expect(data).toHaveProperty('Projects')
      expect(data).toHaveProperty('Contact')
      expect(data).toHaveProperty('Footer')
      
      // Verifica se as seções são objetos
      expect(typeof data.Navbar).toBe('object')
      expect(typeof data.Home).toBe('object')
      expect(typeof data.About).toBe('object')
      expect(typeof data.Projects).toBe('object')
      expect(typeof data.Contact).toBe('object')
      expect(typeof data.Footer).toBe('object')
    })
  })
}) 