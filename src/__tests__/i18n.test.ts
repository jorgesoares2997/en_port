import fs from 'fs'
import path from 'path'

// Tipos para as traduções
interface TranslationValue {
  [key: string]: string | TranslationValue
}

interface TranslationData {
  [key: string]: TranslationValue
}

// Função auxiliar para obter todas as chaves de um objeto aninhado
function getAllKeys(obj: TranslationValue, prefix = ''): string[] {
  const keys: string[] = []
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Se é um objeto, recursivamente obtém as chaves
        keys.push(...getAllKeys(obj[key] as TranslationValue, newKey))
      } else {
        // Se é um valor primitivo, adiciona a chave
        keys.push(newKey)
      }
    }
  }
  
  return keys
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

describe('i18n Translation Keys', () => {
  const languages = ['en', 'pt', 'es']
  const translationFiles = languages.map(lang => `src/messages/${lang}.json`)
  
  const translationData: TranslationData = {}
  
  beforeAll(() => {
    // Carrega todos os arquivos de tradução
    translationFiles.forEach(filePath => {
      const lang = path.basename(filePath, '.json')
      translationData[lang] = loadTranslationFile(filePath)
    })
  })
  
  test('deve ter a mesma estrutura de chaves em todos os idiomas', () => {
    const allKeys: { [key: string]: string[] } = {}
    
    // Obtém todas as chaves de cada idioma
    languages.forEach(lang => {
      allKeys[lang] = getAllKeys(translationData[lang])
    })
    
    // Verifica se todos os idiomas têm as mesmas chaves
    const baseKeys = allKeys[languages[0]] // Usa o primeiro idioma como base
    
    languages.forEach(lang => {
      const missingKeys = baseKeys.filter(key => !allKeys[lang].includes(key))
      const extraKeys = allKeys[lang].filter(key => !baseKeys.includes(key))
      
      // Verifica chaves faltantes
      if (missingKeys.length > 0) {
        console.error(`❌ Chaves faltantes em ${lang}:`, missingKeys)
      }
      
      // Verifica chaves extras
      if (extraKeys.length > 0) {
        console.warn(`⚠️  Chaves extras em ${lang}:`, extraKeys)
      }
      
      // Teste falha se há chaves faltantes
      expect(missingKeys).toHaveLength(0)
    })
  })
  
  test('deve ter valores não vazios para todas as chaves', () => {
    languages.forEach(lang => {
      const checkEmptyValues = (obj: TranslationValue, prefix = ''): string[] => {
        const emptyKeys: string[] = []
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              // Se é um objeto, verifica recursivamente
              emptyKeys.push(...checkEmptyValues(value as TranslationValue, newKey))
            } else if (value === '' || value === null || value === undefined) {
              // Se é um valor vazio
              emptyKeys.push(newKey)
            }
          }
        }
        
        return emptyKeys
      }
      
      const emptyKeys = checkEmptyValues(translationData[lang])
      
      if (emptyKeys.length > 0) {
        console.error(`❌ Valores vazios em ${lang}:`, emptyKeys)
      }
      
      expect(emptyKeys).toHaveLength(0)
    })
  })
  
  test('deve ter estrutura consistente de objetos aninhados', () => {
    languages.forEach(lang => {
      // Verifica se a estrutura é similar (ignorando valores)
      const baseKeys = getAllKeys(translationData[languages[0]])
      const currentKeys = getAllKeys(translationData[lang])
      
      expect(currentKeys.sort()).toEqual(baseKeys.sort())
    })
  })
  
  test('deve ter traduções válidas (verificação inteligente de duplicações)', () => {
    languages.forEach(lang => {
      const checkDuplicateValues = (obj: TranslationValue, prefix = ''): string[] => {
        const duplicateKeys: string[] = []
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              // Se é um objeto, verifica recursivamente
              duplicateKeys.push(...checkDuplicateValues(value as TranslationValue, newKey))
            } else if (typeof value === 'string') {
              // Verifica se o valor é igual à chave (sem considerar contexto)
              const keyName = newKey.split('.').pop() || ''
              if (value.trim() === keyName && value.trim().length > 0) {
                duplicateKeys.push(newKey)
              }
            }
          }
        }
        
        return duplicateKeys
      }
      
      const duplicateKeys = checkDuplicateValues(translationData[lang])
      
      if (duplicateKeys.length > 0) {
        console.warn(`⚠️  Possíveis traduções duplicadas em ${lang}:`, duplicateKeys)
      }
      
      // Não falha o teste, apenas avisa
      expect(duplicateKeys.length).toBeLessThan(5) // Limite mais restritivo
    })
  })
  
  test('deve ter traduções com comprimento adequado', () => {
    languages.forEach(lang => {
      const checkShortTranslations = (obj: TranslationValue, prefix = ''): string[] => {
        const shortKeys: string[] = []
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              // Se é um objeto, verifica recursivamente
              shortKeys.push(...checkShortTranslations(value as TranslationValue, newKey))
            } else if (typeof value === 'string') {
              // Verifica se a tradução é muito curta (pode indicar problema)
              if (value.trim().length < 2 && value.trim().length > 0) {
                shortKeys.push(newKey)
              }
            }
          }
        }
        
        return shortKeys
      }
      
      const shortKeys = checkShortTranslations(translationData[lang])
      
      if (shortKeys.length > 0) {
        console.warn(`⚠️  Traduções muito curtas em ${lang}:`, shortKeys)
      }
      
      // Não falha o teste, apenas avisa
      expect(shortKeys.length).toBeLessThan(10)
    })
  })
  
  test('deve ter seções principais presentes', () => {
    const requiredSections = ['Navbar', 'Home', 'About', 'Projects', 'Contact', 'Footer']
    
    languages.forEach(lang => {
      requiredSections.forEach(section => {
        expect(translationData[lang]).toHaveProperty(section)
        expect(translationData[lang][section]).toBeDefined()
        expect(typeof translationData[lang][section]).toBe('object')
      })
    })
  })
  
  test('deve ter chaves críticas para navegação', () => {
    const criticalKeys = [
      'Navbar.home',
      'Navbar.about', 
      'Navbar.projects',
      'Navbar.contact',
      'Home.title',
      'Contact.title'
    ]
    
    languages.forEach(lang => {
      criticalKeys.forEach(key => {
        const value = getNestedValue(translationData[lang], key)
        expect(value).toBeDefined()
        expect(typeof value).toBe('string')
        expect((value as string).trim().length).toBeGreaterThan(0)
      })
    })
  })
}) 