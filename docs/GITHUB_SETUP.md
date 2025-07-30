# Configuração do GitHub para CI/CD

Este guia te ajudará a configurar completamente o CI/CD no GitHub.

## 🔧 Configurações Necessárias

### 1. Habilitar GitHub Actions

1. Vá para seu repositório: `https://github.com/jorgesoares2997/en_port`
2. Clique na aba **"Actions"** no topo
3. Se aparecer uma mensagem sobre habilitar Actions, clique em **"Enable Actions"**
4. Você deve ver o workflow `CI Pipeline` listado

### 2. Configurar Secrets (para deploy automático)

Para o deploy automático funcionar, você precisa configurar secrets no GitHub:

#### A. Acessar Configurações de Secrets

1. Vá para seu repositório no GitHub
2. Clique em **"Settings"** (aba superior)
3. No menu lateral esquerdo, clique em **"Secrets and variables"**
4. Clique em **"Actions"**

#### B. Adicionar Secrets do Vercel

Você precisará das seguintes secrets:

##### `VERCEL_TOKEN`
1. Vá para [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Settings"** (canto superior direito)
3. Clique em **"Tokens"**
4. Clique em **"Create Token"**
5. Dê um nome como "GitHub Actions"
6. Selecione **"Full Account"** scope
7. Copie o token gerado
8. No GitHub, clique em **"New repository secret"**
9. Nome: `VERCEL_TOKEN`
10. Value: Cole o token copiado

##### `VERCEL_ORG_ID`
1. No Vercel Dashboard, vá em **"Settings"**
2. Clique em **"General"**
3. Copie o **"Team ID"** (ou "Personal Account ID")
4. No GitHub, crie uma nova secret:
   - Nome: `VERCEL_ORG_ID`
   - Value: Cole o ID copiado

##### `VERCEL_PROJECT_ID`
1. No Vercel Dashboard, vá para seu projeto
2. Clique em **"Settings"**
3. Clique em **"General"**
4. Copie o **"Project ID"**
5. No GitHub, crie uma nova secret:
   - Nome: `VERCEL_PROJECT_ID`
   - Value: Cole o ID copiado

### 3. Configurar Codecov (Opcional)

Para relatórios de cobertura mais detalhados:

1. Vá para [Codecov](https://codecov.io)
2. Faça login com sua conta GitHub
3. Adicione seu repositório
4. Copie o token do Codecov
5. No GitHub, crie uma secret:
   - Nome: `CODECOV_TOKEN`
   - Value: Cole o token do Codecov

### 4. Configurar Branch Protection (Recomendado)

Para garantir que apenas código testado seja mergeado:

1. Vá para **"Settings"** > **"Branches"**
2. Clique em **"Add rule"**
3. Configure para a branch `main`:
   - ✅ **"Require a pull request before merging"**
   - ✅ **"Require status checks to pass before merging"**
   - ✅ **"Require branches to be up to date before merging"**
   - ✅ **"Require conversation resolution before merging"**
4. Em **"Status checks that are required"**, adicione:
   - `test-and-build` (nome do job no workflow)

## 🚀 Testando o CI/CD

### 1. Criar Pull Request

1. Vá para: `https://github.com/jorgesoares2997/en_port/pull/new/feature/test-ci-cd`
2. Clique em **"Create pull request"**
3. Adicione uma descrição como:
   ```
   Test: Add new translation key to verify CI/CD pipeline
   
   This PR adds a new translation key to test the CI/CD pipeline:
   - Added "test" key in all languages
   - Verifies that tests still pass
   - Tests the GitHub Actions workflow
   ```

### 2. Verificar o Workflow

1. No Pull Request, você verá uma seção **"Checks"**
2. Clique em **"Show all checks"**
3. Você deve ver:
   - ✅ **CI Pipeline** - Testes, linting e build
   - ⏳ **Codecov** - Relatório de cobertura

### 3. Monitorar o Progresso

1. Clique no workflow **"CI Pipeline"**
2. Você verá os logs em tempo real
3. O workflow deve executar:
   - Setup do Node.js
   - Instalação de dependências
   - Linting
   - Testes
   - Build
   - Upload de cobertura

## 📊 Verificando Resultados

### 1. Status do Pull Request

- **Verde**: Todos os testes passaram ✅
- **Vermelho**: Algum teste falhou ❌
- **Amarelo**: Workflow em execução ⏳

### 2. Relatório de Cobertura

1. Clique no link do **Codecov** no PR
2. Você verá:
   - Cobertura geral do projeto
   - Diferenças de cobertura
   - Arquivos com mudanças

### 3. Logs Detalhados

1. No workflow, clique em qualquer step
2. Você verá logs detalhados
3. Útil para debug se algo falhar

## 🔄 Workflow de Desenvolvimento

### 1. Desenvolvimento Local

```bash
# Fazer mudanças
git checkout -b feature/nova-funcionalidade

# Desenvolver e testar localmente
npm test
npm run lint
npm run build

# Commit e push
git add .
git commit -m "feat: nova funcionalidade"
git push origin feature/nova-funcionalidade
```

### 2. Pull Request

1. Criar PR no GitHub
2. O CI/CD executa automaticamente
3. Revisar resultados
4. Merge se tudo passar

### 3. Deploy Automático

- **Branch `development`**: Deploy para staging
- **Branch `main`**: Deploy para produção

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Workflow não executa
- Verifique se GitHub Actions está habilitado
- Verifique se o arquivo `.github/workflows/ci-simple.yml` existe
- Verifique se a branch está correta no workflow

#### 2. Testes falham no CI mas passam localmente
- Verifique versões do Node.js
- Verifique dependências
- Execute `npm ci` localmente para testar

#### 3. Build falha
- Verifique se todas as dependências estão instaladas
- Verifique se não há imports quebrados
- Execute `npm run build` localmente

#### 4. Secrets não encontradas
- Verifique se as secrets estão configuradas corretamente
- Verifique se os nomes das secrets estão corretos
- Verifique se as secrets são acessíveis pelo workflow

### Logs Úteis

```bash
# Verificar status do workflow
gh run list

# Ver logs de um workflow específico
gh run view <workflow-id>

# Re-executar workflow
gh run rerun <workflow-id>
```

## 📈 Próximos Passos

### 1. Configurar Deploy Automático

Após configurar as secrets do Vercel:

1. O workflow completo será ativado
2. Deploy automático para staging/produção
3. Notificações de deploy

### 2. Adicionar Mais Testes

1. Testes de componentes React
2. Testes de API
3. Testes E2E

### 3. Configurar Notificações

1. Slack/Discord notifications
2. Email notifications
3. Status badges no README

## 🎯 Checklist de Configuração

- [ ] GitHub Actions habilitado
- [ ] Secrets do Vercel configuradas
- [ ] Branch protection configurada
- [ ] Pull Request criado
- [ ] Workflow executando
- [ ] Testes passando
- [ ] Build funcionando
- [ ] Cobertura sendo reportada

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do workflow
2. Teste localmente primeiro
3. Verifique a documentação do GitHub Actions
4. Consulte a documentação do Vercel 