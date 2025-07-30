# Configuração do Vercel para Deploy Automático

Este guia te ajudará a configurar o Vercel e obter as credenciais necessárias para o deploy automático.

## 🚀 Passo 1: Criar Conta no Vercel

1. **Vá para**: [vercel.com](https://vercel.com)
2. **Clique em "Sign Up"**
3. **Faça login com sua conta GitHub**
4. **Autorize o Vercel** a acessar seus repositórios

## 📋 Passo 2: Importar o Projeto

1. **No Dashboard do Vercel**, clique em **"New Project"**
2. **Importe seu repositório**: `jorgesoares2997/en_port`
3. **Configure o projeto**:
   - Framework Preset: `Next.js`
   - Root Directory: `./` (padrão)
   - Build Command: `npm run build` (padrão)
   - Output Directory: `.next` (padrão)
4. **Clique em "Deploy"**

## 🔑 Passo 3: Obter as Credenciais

### A. VERCEL_TOKEN

1. **No Vercel Dashboard**, clique no seu **avatar** (canto superior direito)
2. **Clique em "Settings"**
3. **No menu lateral**, clique em **"Tokens"**
4. **Clique em "Create Token"**
5. **Configure o token**:
   - **Name**: `GitHub Actions CI/CD`
   - **Expiration**: `No expiration` (ou escolha uma data)
   - **Scope**: ✅ **"Full Account"**
6. **Clique em "Create"**
7. **Copie o token** (você só verá uma vez!)

### B. VERCEL_ORG_ID

1. **No Vercel Dashboard**, clique no seu **avatar**
2. **Clique em "Settings"**
3. **Na aba "General"**, procure por:
   - **"Personal Account ID"** (se for conta pessoal)
   - **"Team ID"** (se for conta de equipe)
4. **Copie o ID**

### C. VERCEL_PROJECT_ID

1. **No Vercel Dashboard**, clique no seu **projeto** (`en_port`)
2. **Clique em "Settings"**
3. **Na aba "General"**, procure por **"Project ID"**
4. **Copie o ID**

## 📝 Exemplo de Valores

Suas credenciais devem se parecer com isso:

```
VERCEL_TOKEN: v1_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
VERCEL_ORG_ID: team_abc123def456ghi789
VERCEL_PROJECT_ID: prj_abc123def456ghi789jkl012
```

## ⚠️ Importante

- **Guarde essas credenciais em um local seguro**
- **Nunca compartilhe o VERCEL_TOKEN**
- **Os IDs podem ser compartilhados** (não são secretos por si só)

## 🔄 Próximo Passo

Após obter essas credenciais, volte para o guia de configuração do GitHub para adicioná-las como secrets. 