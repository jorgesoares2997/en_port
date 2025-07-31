# 🚀 CI/CD Pipeline Seguro - Documentação

## 📋 Visão Geral

Este documento descreve o padrão seguro de CI/CD implementado para garantir que **apenas código de qualidade seja deployado para produção**.

## 🎯 Objetivos

- ✅ **Garantir qualidade**: Todos os testes DEVEM passar antes do deploy
- 🛡️ **Segurança**: Vulnerabilidades críticas bloqueiam o deploy
- 📊 **Cobertura**: Mínimo de 80% de cobertura de testes
- 🔄 **Automação**: Pipeline totalmente automatizado
- 🚫 **Prevenção**: Deploy para produção só via branch `main`

## 🏗️ Arquitetura do Pipeline

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Push/PR       │───▶│  Quality Gate   │───▶│    Deploy       │
│                 │    │   (OBRIGATÓRIO) │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Staging       │
                       │   Production    │
                       └─────────────────┘
```

## 🔍 Quality Gate (Validação de Qualidade)

### O que é executado:

1. **🔍 Auditoria de Segurança (Críticas)**
   - Verifica vulnerabilidades CRÍTICAS
   - **BLOQUEIA** o deploy se encontrar problemas
   - Comando: `npm audit --audit-level=critical`

2. **🧹 Linting**
   - Executa ESLint para verificar padrões de código
   - **BLOQUEIA** o deploy se encontrar erros
   - Comando: `npm run lint`

3. **🧪 Testes Unitários**
   - Executa todos os testes com Jest
   - **BLOQUEIA** o deploy se algum teste falhar
   - Comando: `npm test`

4. **📊 Cobertura de Testes**
   - Verifica se a cobertura está acima de 80%
   - **BLOQUEIA** o deploy se estiver abaixo
   - Comando: `npm run test:coverage`

5. **🔨 Build do Projeto**
   - Compila o projeto Next.js
   - **BLOQUEIA** o deploy se o build falhar
   - Comando: `npm run build`

6. **🛡️ Auditoria de Segurança (Moderadas)**
   - Verifica vulnerabilidades moderadas
   - **NÃO BLOQUEIA** o deploy, apenas avisa
   - Comando: `npm audit --audit-level=moderate`

## 🚀 Deploy

### Staging (Branch `development`)
- ✅ Executa apenas se Quality Gate passar
- 🌐 Ambiente de teste
- 🔗 URL: `https://staging-seu-projeto.vercel.app`

### Produção (Branch `main`)
- ✅ Executa apenas se Quality Gate passar
- 🌐 Ambiente de produção
- 🔍 Validações extras:
  - Verifica `console.log` no código
  - Analisa tamanho do build
- 🔗 URL: `https://seu-projeto.vercel.app`

## 🔧 Configuração

### Secrets Necessários (GitHub)

```bash
VERCEL_TOKEN=seu_token_do_vercel
VERCEL_ORG_ID=seu_org_id_do_vercel
VERCEL_PROJECT_ID=seu_project_id_do_vercel
```

### Scripts NPM

```json
{
  "test:ci": "jest --coverage --watchAll=false --passWithNoTests",
  "quality-check": "npm run lint && npm run test:ci && npm run build",
  "security-audit": "npm audit --audit-level=critical"
}
```

## 🚨 Cenários de Bloqueio

### 1. Vulnerabilidades Críticas
```bash
❌ Vulnerabilidades CRÍTICAS encontradas!
🚨 O deploy foi BLOQUEADO por questões de segurança.
```

### 2. Erros de Linting
```bash
❌ Problemas de linting encontrados!
🚨 Corrija os erros de estilo antes do deploy.
```

### 3. Testes Falhando
```bash
❌ Testes unitários falharam!
🚨 Corrija os testes antes do deploy.
```

### 4. Cobertura Baixa
```bash
❌ Cobertura de testes abaixo de 80% (atual: 75%)
🚨 Aumente a cobertura de testes antes do deploy.
```

### 5. Build Falhando
```bash
❌ Build falhou!
🚨 Corrija os erros de build antes do deploy.
```

## 📈 Monitoramento

### Relatórios de Cobertura
- 📊 Enviados automaticamente para Codecov
- 📈 Acompanhamento da qualidade dos testes
- 🔗 Disponível em: `https://codecov.io/gh/seu-usuario/seu-repo`

### Logs do Pipeline
- 📝 Logs detalhados no GitHub Actions
- 🔍 Rastreamento de cada etapa
- ⚡ Notificações de sucesso/falha

## 🛠️ Troubleshooting

### Problema: Pipeline falha no Quality Gate

**Soluções:**
1. Execute localmente: `npm run quality-check`
2. Verifique os logs do GitHub Actions
3. Corrija os problemas identificados
4. Faça novo commit e push

### Problema: Deploy não executa

**Verificações:**
1. ✅ Quality Gate passou?
2. ✅ Está na branch correta (`main` ou `development`)?
3. ✅ Secrets configurados corretamente?
4. ✅ Permissões do Vercel configuradas?

### Problema: Testes falham no CI mas passam localmente

**Possíveis causas:**
1. Versão do Node.js diferente
2. Dependências não instaladas corretamente
3. Variáveis de ambiente não configuradas
4. Cache do Jest interferindo

## 🔒 Segurança

### Proteções Implementadas

1. **Vulnerabilidades Críticas**: Bloqueiam deploy
2. **Branch Protection**: Deploy só via branches específicas
3. **Dependências**: Auditoria automática
4. **Build Validation**: Verificação de compilação
5. **Test Coverage**: Mínimo de qualidade garantido

### Boas Práticas

- 🔒 Nunca commite secrets no código
- 🧪 Mantenha cobertura de testes alta
- 🔄 Use branches para features
- 📝 Documente mudanças importantes
- 🛡️ Atualize dependências regularmente

## 📞 Suporte

Se encontrar problemas:

1. 📖 Verifique esta documentação
2. 🔍 Analise os logs do GitHub Actions
3. 🐛 Abra uma issue no repositório
4. 💬 Entre em contato com a equipe

---

**Última atualização**: $(date)
**Versão do Pipeline**: 2.0.0 