// Importações necessárias para trabalhar com arquivos e caminhos
import fs from 'fs'        // Módulo do Node.js para operações de arquivo
import path from 'path'    // Módulo do Node.js para manipulação de caminhos

// ============================================================================
// DEFINIÇÃO DE TIPOS TYPESCRIPT
// ============================================================================

// Interface que define a estrutura de um valor de tradução
// Pode ser uma string (tradução final) ou outro objeto (estrutura aninhada)
interface TranslationValue {
  [key: string]: string | TranslationValue  // Chave dinâmica que pode ter string ou objeto
}

// Interface que representa todos os dados de tradução
// Organizado por idioma (en, pt, es)
interface TranslationData {
  [key: string]: TranslationValue  // Chave é o código do idioma (ex: 'en', 'pt')
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Função recursiva que extrai TODAS as chaves de um objeto aninhado
 * 
 * Exemplo de uso:
 * const obj = { a: { b: "test", c: { d: "value" } } }
 * getAllKeys(obj) retorna: ["a.b", "a.c.d"]
 * 
 * @param obj - Objeto de tradução para analisar
 * @param prefix - Prefixo atual para construir o caminho da chave
 * @returns Array com todas as chaves no formato "pai.filho.neto"
 */
function getAllKeys(obj: TranslationValue, prefix = ''): string[] {
  const keys: string[] = []
  
  // Itera sobre todas as propriedades do objeto
  for (const key in obj) {
    // Verifica se a propriedade pertence ao próprio objeto (não herdada)
    if (obj.hasOwnProperty(key)) {
      // Constrói o nome da chave com o prefixo (ex: "Navbar.home")
      // Se não tiver o prefixo, tipo já vier "home", ele deixa só a chave, tipo "title". se tiver o prefixo, ele retorna o prefixo + a chave, no caso "home.title".
      const newKey = prefix ? `${prefix}.${key}` : key
      
      // Verifica se o valor é um objeto (estrutura aninhada)
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // RECURSÃO: chama a função novamente para o objeto aninhado
        // Isso permite navegar por estruturas como: Navbar -> home, about, etc.
        keys.push(...getAllKeys(obj[key] as TranslationValue, newKey))
      } else {
        // Valor primitivo (string) - adiciona a chave final
        keys.push(newKey)
      }
    }
  }
  
  return keys
}

/**
 * Função para carregar um arquivo JSON de tradução
 * 
 * @param filePath - Caminho relativo do arquivo (ex: "src/messages/en.json")
 * @returns Objeto JavaScript com as traduções
 */
function loadTranslationFile(filePath: string): TranslationValue {
  try {
    // process.cwd() retorna o diretório raiz do projeto
    // path.join() combina caminhos de forma segura para qualquer SO
    const fullPath = path.join(process.cwd(), filePath)
    
    // Lê o arquivo como string UTF-8
    const fileContent = fs.readFileSync(fullPath, 'utf-8')
    
    // Converte a string JSON em objeto JavaScript
    return JSON.parse(fileContent)
  } catch (error) {
    // Se houver erro (arquivo não existe, JSON inválido, etc.), lança exceção
    throw new Error(`Erro ao carregar arquivo ${filePath}: ${error}`)
  }
}

/**
 * Função para acessar valores em objetos aninhados usando notação de ponto
 * 
 * Exemplo:
 * const obj = { a: { b: { c: "valor" } } }
 * getNestedValue(obj, "a.b.c") retorna "valor"
 * 
 * @param obj - Objeto base
 * @param keyPath - Caminho da chave (ex: "Navbar.home")
 * @returns Valor encontrado ou undefined se não existir
 */
function getNestedValue(obj: TranslationValue, keyPath: string): string | TranslationValue | undefined {
  // Divide o caminho em partes: "Navbar.home" -> ["Navbar", "home"]
  const keys = keyPath.split('.')
  
  // Variável que vai navegando pelo objeto
  let current: TranslationValue | string | undefined = obj
  
  // Itera sobre cada parte do caminho
  for (const key of keys) {
    // Verifica se o valor atual é um objeto e se tem a propriedade
    if (current && typeof current === 'object' && current[key] !== undefined) {
      // Move para o próximo nível
      current = current[key]
    } else {
      // Se não encontrar, retorna undefined
      return undefined
    }
  }
  
  return current
}

// ============================================================================
// SUITE DE TESTES JEST
// ============================================================================

// describe() agrupa testes relacionados - aparece no relatório de testes
describe('i18n Translation Keys', () => {
  // Configuração dos idiomas e arquivos
  const languages = ['en', 'pt', 'es']  // Códigos dos idiomas
  const translationFiles = languages.map(lang => `src/messages/${lang}.json`)  // Caminhos dos arquivos
  
  // Variável que vai armazenar todos os dados de tradução
  const translationData: TranslationData = {}
  
  // beforeAll() executa UMA VEZ antes de TODOS os testes
  // Ideal para setup que não muda entre testes
  beforeAll(() => {
    // Carrega todos os arquivos de tradução na memória
    translationFiles.forEach(filePath => {
      // Extrai o código do idioma do nome do arquivo (ex: "en.json" -> "en")
      const lang = path.basename(filePath, '.json')
      // Armazena os dados carregados
      translationData[lang] = loadTranslationFile(filePath)
    })
  })
  
  // ============================================================================
  // TESTE 1: Estrutura de chaves consistente
  // ============================================================================
  
  test('deve ter a mesma estrutura de chaves em todos os idiomas', () => {
    // Objeto para armazenar as chaves de cada idioma
    const allKeys: { [key: string]: string[] } = {}
    
    // Obtém todas as chaves de cada idioma usando nossa função auxiliar
    languages.forEach(lang => {
      allKeys[lang] = getAllKeys(translationData[lang])
    })
    
    // Usa o primeiro idioma como referência (base de comparação)
    const baseKeys = allKeys[languages[0]] // Geralmente 'en'
    
    // Compara cada idioma com a base
    languages.forEach(lang => {
      // Encontra chaves que existem na base mas não no idioma atual
      const missingKeys = baseKeys.filter(key => !allKeys[lang].includes(key))
      
      // Encontra chaves que existem no idioma atual mas não na base
      const extraKeys = allKeys[lang].filter(key => !baseKeys.includes(key))
      
      // Log de chaves faltantes (erro crítico)
      if (missingKeys.length > 0) {
        // o que diz se é critico é por que tá lançando console.error, aí dispara de fato o erro e trava o sistema.
        console.error(`❌ Chaves faltantes em ${lang}:`, missingKeys)
      }
      
      // Log de chaves extras (aviso, pode ser intencional)
      if (extraKeys.length > 0) {
        console.warn(`⚠️  Chaves extras em ${lang}:`, extraKeys)
      }
      
      // TESTE: falha se há chaves faltantes (isso quebra a aplicação)
      expect(missingKeys).toHaveLength(0)
    })
  })
  
  // ============================================================================
  // TESTE 2: Valores não vazios
  // ============================================================================
  
  test('deve ter valores não vazios para todas as chaves', () => {
    languages.forEach(lang => {
      // Função interna que verifica valores vazios recursivamente
      const checkEmptyValues = (obj: TranslationValue, prefix = ''): string[] => {
        const emptyKeys: string[] = []
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              // Se é objeto, continua navegando
              emptyKeys.push(...checkEmptyValues(value as TranslationValue, newKey))
            } else if (value === '' || value === null || value === undefined) {
              // Encontrou valor vazio - adiciona à lista
              emptyKeys.push(newKey)
            }
          }
        }
        
        return emptyKeys
      }
      
      // Executa a verificação para o idioma atual
      const emptyKeys = checkEmptyValues(translationData[lang])
      
      // Log dos problemas encontrados
      if (emptyKeys.length > 0) {
        console.error(`❌ Valores vazios em ${lang}:`, emptyKeys)
      }
      
      // TESTE: falha se há valores vazios
      expect(emptyKeys).toHaveLength(0)
    })
  })
  
  // ============================================================================
  // TESTE 3: Estrutura consistente de objetos aninhados
  // ============================================================================
  
  test('deve ter estrutura consistente de objetos aninhados', () => {
    languages.forEach(lang => {
      // Obtém todas as chaves do idioma base (primeiro)
      const baseKeys = getAllKeys(translationData[languages[0]])
      
      // Obtém todas as chaves do idioma atual
      const currentKeys = getAllKeys(translationData[lang])
      
      // TESTE: compara as listas ordenadas (ordem não importa, só conteúdo)
      expect(currentKeys.sort()).toEqual(baseKeys.sort())
    })
  })
  
  // ============================================================================
  // TESTE 4: Verificação inteligente de duplicações
  // ============================================================================
  
  test('deve ter traduções válidas (verificação inteligente de duplicações)', () => {
    languages.forEach(lang => {
      // Função que detecta traduções que são iguais à chave
      const checkDuplicateValues = (obj: TranslationValue, prefix = ''): string[] => {
        const duplicateKeys: string[] = []
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              // Continua navegando em objetos
              duplicateKeys.push(...checkDuplicateValues(value as TranslationValue, newKey))
            } else if (typeof value === 'string') {
              // LÓGICA: extrai o nome da chave (última parte após o ponto)
              const keyName = newKey.split('.').pop() || ''
              
              // Verifica se o valor é igual ao nome da chave
              // Exemplo: chave "Navbar.home" com valor "home" = problema
              if (value.trim() === keyName && value.trim().length > 0) {
                duplicateKeys.push(newKey)
              }
            }
          }
        }
        
        return duplicateKeys
      }
      
      const duplicateKeys = checkDuplicateValues(translationData[lang])
      
      // Log de possíveis problemas
      if (duplicateKeys.length > 0) {
        console.warn(`⚠️  Possíveis traduções duplicadas em ${lang}:`, duplicateKeys)
      }
      
      // TESTE: não falha, mas limita o número de duplicações aceitáveis
      expect(duplicateKeys.length).toBeLessThan(5)
    })
  })
  
  // ============================================================================
  // TESTE 5: Comprimento adequado das traduções
  // ============================================================================
  
  test('deve ter traduções com comprimento adequado', () => {
    languages.forEach(lang => {
      // Função que detecta traduções muito curtas
      const checkShortTranslations = (obj: TranslationValue, prefix = ''): string[] => {
        const shortKeys: string[] = []
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              // Continua navegando
              shortKeys.push(...checkShortTranslations(value as TranslationValue, newKey))
            } else if (typeof value === 'string') {
              // Verifica se a tradução é muito curta (menos de 2 caracteres)
              // Pode indicar tradução incompleta ou erro
              if (value.trim().length < 2 && value.trim().length > 0) {
                shortKeys.push(newKey)
              }
            }
          }
        }
        
        return shortKeys
      }
      
      const shortKeys = checkShortTranslations(translationData[lang])
      
      // Log de avisos
      if (shortKeys.length > 0) {
        console.warn(`⚠️  Traduções muito curtas em ${lang}:`, shortKeys)
      }
      
      // TESTE: limita o número de traduções curtas aceitáveis
      expect(shortKeys.length).toBeLessThan(10)
    })
  })
  
  // ============================================================================
  // TESTE 6: Seções principais obrigatórias
  // ============================================================================
  
  test('deve ter seções principais presentes', () => {
    // Lista das seções que DEVEM existir em todos os idiomas
    const requiredSections = ['Navbar', 'Home', 'About', 'Projects', 'Contact', 'Footer']
    
    languages.forEach(lang => {
      requiredSections.forEach(section => {
        // TESTE: verifica se a seção existe
        expect(translationData[lang]).toHaveProperty(section)
        
        // TESTE: verifica se a seção não é undefined
        expect(translationData[lang][section]).toBeDefined()
        
        // TESTE: verifica se a seção é um objeto (não string)
        expect(typeof translationData[lang][section]).toBe('object')
      })
    })
  })
  
  // ============================================================================
  // TESTE 7: Chaves críticas para navegação
  // ============================================================================
  
  test('deve ter chaves críticas para navegação', () => {
    // Lista das chaves mais importantes para o funcionamento da aplicação
    const criticalKeys = [
      'Navbar.home',      // Link para home
      'Navbar.about',     // Link para sobre
      'Navbar.projects',  // Link para projetos
      'Navbar.contact',   // Link para contato
      'Home.title',       // Título da página inicial
      'Contact.title'     // Título da página de contato
    ]
    
    languages.forEach(lang => {
      criticalKeys.forEach(key => {
        // Usa nossa função auxiliar para acessar valores aninhados
        const value = getNestedValue(translationData[lang], key)
        
        // TESTE: verifica se a chave existe
        expect(value).toBeDefined()
        
        // TESTE: verifica se é uma string
        expect(typeof value).toBe('string')
        
        // TESTE: verifica se não está vazia
        expect((value as string).trim().length).toBeGreaterThan(0)
      })
    })
  })
}) 