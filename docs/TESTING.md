# Documentação de Testes

Este documento descreve a estratégia de testes implementada no projeto Portfolio.

## 🎯 Visão Geral

O projeto utiliza **Jest** como framework de testes principal, com **React Testing Library** para testes de componentes React. A estratégia de testes é focada em:

- **Testes Unitários**: Funções e utilitários isolados
- **Testes de Integração**: Interação entre diferentes partes do sistema
- **Testes de Regressão**: Prevenção de bugs em funcionalidades existentes

## 📁 Estrutura de Testes

```
src/__tests__/
├── i18n.test.ts              # Testes de internacionalização
├── translationUtils.test.ts   # Testes de utilitários de tradução
└── components/               # Testes de componentes (futuro)
    ├── Navbar.test.tsx
    ├── ContactForm.test.tsx
    └── ...
```

## 🧪 Tipos de Testes

### 1. Testes de i18n (`i18n.test.ts`)

**Objetivo**: Garantir que o sistema de internacionalização funcione corretamente.

**Testes Implementados**:

#### ✅ Estrutura de Chaves
```typescript
test('deve ter a mesma estrutura de chaves em todos os idiomas', () => {
  // Verifica se todos os idiomas têm as mesmas chaves
  // Falha se há chaves faltantes em algum idioma
})
```

#### ✅ Valores Não Vazios
```typescript
test('deve ter valores não vazios para todas as chaves', () => {
  // Verifica se não há traduções vazias
  // Falha se encontrar valores vazios, null ou undefined
})
```

#### ✅ Estrutura Consistente
```typescript
test('deve ter estrutura consistente de objetos aninhados', () => {
  // Verifica se a estrutura de objetos é a mesma em todos os idiomas
  // Garante que não há diferenças na hierarquia
})
```

#### ✅ Traduções Válidas
```typescript
test('deve ter traduções válidas (verificação inteligente de duplicações)', () => {
  // Verifica se as traduções não são apenas cópias das chaves
  // Alerta sobre possíveis traduções duplicadas
})
```

#### ✅ Comprimento Adequado
```typescript
test('deve ter traduções com comprimento adequado', () => {
  // Verifica se as traduções não são muito curtas
  // Alerta sobre possíveis problemas de tradução
})
```

#### ✅ Seções Principais
```typescript
test('deve ter seções principais presentes', () => {
  // Verifica se todas as seções críticas existem
  // Garante que a estrutura básica está completa
})
```

#### ✅ Chaves Críticas
```typescript
test('deve ter chaves críticas para navegação', () => {
  // Verifica se as chaves essenciais para navegação existem
  // Garante que o site é funcional em todos os idiomas
})
```

### 2. Testes de Utilitários (`translationUtils.test.ts`)

**Objetivo**: Testar funções utilitárias relacionadas a traduções.

**Funções Testadas**:

#### ✅ Carregamento de Arquivos
```typescript
test('deve carregar arquivos de tradução corretamente', () => {
  // Verifica se os arquivos JSON são carregados sem erros
  // Garante que a estrutura é válida
})
```

#### ✅ Obtenção de Valores Aninhados
```typescript
test('deve obter valores aninhados corretamente', () => {
  // Testa a função getNestedValue()
  // Verifica acesso a propriedades aninhadas como 'Navbar.home'
})
```

#### ✅ Tradução de Chaves
```typescript
test('deve traduzir chaves corretamente', () => {
  // Testa a função translateKey()
  // Verifica se as traduções são aplicadas corretamente
})
```

#### ✅ Traduções de Navegação
```typescript
test('deve traduzir chaves de navegação em todos os idiomas', () => {
  // Verifica se todas as chaves de navegação estão traduzidas
  // Garante que o menu funciona em todos os idiomas
})
```

#### ✅ Títulos Principais
```typescript
test('deve traduzir títulos principais em todos os idiomas', () => {
  // Verifica se os títulos das páginas estão traduzidos
  // Garante que a experiência do usuário é consistente
})
```

#### ✅ Consistência Entre Idiomas
```typescript
test('deve ter traduções consistentes entre idiomas', () => {
  // Verifica se as traduções são diferentes entre idiomas
  // Garante que não há cópias diretas
})
```

#### ✅ Tratamento de Erros
```typescript
test('deve lidar com chaves inexistentes graciosamente', () => {
  // Verifica se o sistema trata chaves inexistentes
  // Garante que não há crashes por chaves faltantes
})
```

#### ✅ Estrutura de Dados
```typescript
test('deve ter estrutura de dados válida', () => {
  // Verifica se a estrutura JSON é válida
  // Garante que todas as seções necessárias existem
})
```

## 🚀 Executando Testes

### Comandos Básicos

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (desenvolvimento)
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Executar testes específicos
npm test -- i18n.test.ts
npm test -- translationUtils.test.ts
```

### Modo Watch

O modo watch é útil durante o desenvolvimento:

```bash
npm run test:watch
```

Isso irá:
- Executar testes automaticamente quando arquivos mudam
- Mostrar apenas testes que falharam
- Permitir interação para re-executar testes específicos

### Cobertura de Testes

Para gerar relatório de cobertura:

```bash
npm run test:coverage
```

O relatório mostra:
- **Statements**: Porcentagem de linhas executadas
- **Branches**: Porcentagem de branches (if/else) testados
- **Functions**: Porcentagem de funções chamadas
- **Lines**: Porcentagem de linhas cobertas

## 📊 Métricas de Qualidade

### Cobertura Atual

- **Testes**: 15 testes passando
- **Arquivos Testados**: 2 suites principais
- **Tempo de Execução**: ~0.6s

### Metas de Cobertura

- **Meta Geral**: 70% de cobertura
- **Threshold**: 5% (tolerância para mudanças)
- **Arquivos Críticos**: 80% de cobertura

## 🔧 Configuração

### Jest Configuration (`jest.config.js`)

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### Jest Setup (`jest.setup.js`)

```javascript
import '@testing-library/jest-dom'

// Mocks para Next.js
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      // ... outros métodos
    }
  },
}))

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
```

## 🎯 Próximos Passos

### Testes Planejados

1. **Testes de Componentes**
   - `Navbar.test.tsx` - Testar navegação e mudança de idioma
   - `ContactForm.test.tsx` - Testar formulário de contato
   - `WeatherMini.test.tsx` - Testar componente de clima

2. **Testes de API**
   - `api/login/route.test.ts` - Testar rota de login
   - `api/send-email/route.test.ts` - Testar envio de email

3. **Testes de Integração**
   - Fluxo completo de navegação
   - Mudança de idioma em tempo real
   - Submissão de formulários

### Melhorias Planejadas

1. **Testes E2E**
   - Cypress ou Playwright para testes end-to-end
   - Testes de acessibilidade
   - Testes de performance

2. **Testes de Performance**
   - Lighthouse CI
   - Testes de bundle size
   - Testes de tempo de carregamento

3. **Testes de Acessibilidade**
   - Jest-axe para testes de acessibilidade
   - Testes de navegação por teclado
   - Testes de screen readers

## 🐛 Debugging de Testes

### Problemas Comuns

1. **Testes Falhando Inesperadamente**
   ```bash
   # Limpar cache do Jest
   npm test -- --clearCache
   ```

2. **Problemas com Mocks**
   ```bash
   # Verificar se os mocks estão funcionando
   npm test -- --verbose
   ```

3. **Problemas de Timing**
   ```bash
   # Aumentar timeout para testes lentos
   npm test -- --testTimeout=10000
   ```

### Logs e Debugging

```bash
# Executar testes com logs detalhados
npm test -- --verbose

# Executar um teste específico com logs
npm test -- i18n.test.ts --verbose

# Executar testes em modo debug
npm test -- --detectOpenHandles
```

## 📚 Recursos Adicionais

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 