# Portfolio - Jorge Soares

Um portfólio moderno e responsivo desenvolvido com Next.js, TypeScript e Tailwind CSS, com suporte a múltiplos idiomas (Português, Inglês e Espanhol).

🚀 **CI/CD Ativo**: Deploy automático configurado!

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilização**: Tailwind CSS, Framer Motion
- **Estado**: Zustand
- **Internacionalização**: Sistema customizado i18n
- **Testes**: Jest, React Testing Library
- **CI/CD**: GitHub Actions
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/en_port.git
cd en_port
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🧪 Testes

### Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Testes Implementados

#### 1. Testes de i18n (`src/__tests__/i18n.test.ts`)
- ✅ Verifica estrutura de chaves em todos os idiomas
- ✅ Verifica valores não vazios
- ✅ Verifica estrutura consistente
- ✅ Verifica traduções válidas
- ✅ Verifica comprimento adequado
- ✅ Verifica seções principais
- ✅ Verifica chaves críticas de navegação

#### 2. Testes de Utilitários (`src/__tests__/translationUtils.test.ts`)
- ✅ Verifica carregamento de arquivos
- ✅ Verifica obtenção de valores aninhados
- ✅ Verifica tradução de chaves
- ✅ Verifica traduções de navegação
- ✅ Verifica títulos principais
- ✅ Verifica consistência entre idiomas
- ✅ Verifica tratamento de chaves inexistentes
- ✅ Verifica estrutura de dados

### Cobertura de Testes

O projeto está configurado para gerar relatórios de cobertura de testes. Execute:

```bash
npm run test:coverage
```

Isso irá gerar um relatório detalhado mostrando:
- Porcentagem de cobertura por arquivo
- Linhas não cobertas
- Branches não testados
- Funções não testadas

## 🔄 CI/CD Pipeline

O projeto utiliza GitHub Actions para CI/CD automatizado.

### Workflow de CI (`/.github/workflows/ci-simple.yml`)

O pipeline executa automaticamente em:
- Push para branches `main` e `development`
- Pull Requests para branches `main` e `development`

#### Etapas do Pipeline:

1. **Setup do Ambiente**
   - Checkout do código
   - Setup do Node.js 18
   - Cache de dependências

2. **Qualidade de Código**
   - Instalação de dependências (`npm ci`)
   - Linting (`npm run lint`)
   - Execução de testes (`npm test`)

3. **Cobertura e Build**
   - Geração de cobertura (`npm run test:coverage`)
   - Build do projeto (`npm run build`)
   - Upload de cobertura para Codecov

4. **Segurança**
   - Auditoria de dependências (`npm audit`)

### Configuração do Codecov

O projeto está configurado para integração com Codecov:
- Meta de cobertura: 70%
- Threshold: 5%
- Relatórios detalhados em Pull Requests

## 📁 Estrutura do Projeto

```
en_port/
├── src/
│   ├── app/                 # Páginas Next.js (App Router)
│   ├── components/          # Componentes React
│   ├── lib/                 # Utilitários e configurações
│   ├── messages/            # Arquivos de tradução (i18n)
│   ├── stores/              # Stores Zustand
│   └── __tests__/           # Testes
├── .github/workflows/       # GitHub Actions
├── public/                  # Arquivos estáticos
└── docs/                    # Documentação
```

## 🌐 Internacionalização (i18n)

O projeto suporta três idiomas:
- 🇧🇷 Português (pt)
- 🇺🇸 Inglês (en)
- 🇪🇸 Espanhol (es)

### Arquivos de Tradução
- `src/messages/pt.json` - Traduções em português
- `src/messages/en.json` - Traduções em inglês
- `src/messages/es.json` - Traduções em espanhol

### Testes de i18n
Os testes garantem que:
- Todas as chaves existem em todos os idiomas
- Não há traduções vazias
- A estrutura é consistente
- As traduções são válidas

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel:

1. **Staging**: Deploy automático na branch `development`
2. **Produção**: Deploy automático na branch `main`

### Variáveis de Ambiente Necessárias

Para o deploy automático, configure as seguintes secrets no GitHub:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 📊 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção

# Testes
npm test             # Executa testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura

# Qualidade
npm run lint         # Executa ESLint
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Checklist para Pull Requests

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (`npm test`)
- [ ] Linting passa (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] Cobertura de testes adequada
- [ ] Documentação atualizada

## 📈 Métricas de Qualidade

- **Testes**: 15 testes passando
- **Cobertura**: Configurada para 70%
- **Linting**: ESLint configurado
- **Build**: Otimizado para produção
- **Performance**: Lighthouse score > 90

## 📞 Contato

Jorge Soares - jorgesoares2997@gmail.com

Link do Projeto: [https://github.com/seu-usuario/en_port](https://github.com/seu-usuario/en_port)
