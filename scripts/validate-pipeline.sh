#!/bin/bash

# ============================================================================
# SCRIPT DE VALIDAÇÃO LOCAL DO PIPELINE CI/CD
# ============================================================================
# 
# Este script simula localmente as validações que acontecem no GitHub Actions
# Execute antes de fazer push para garantir que o pipeline passará
# ============================================================================

set -e  # Para o script se qualquer comando falhar

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Função para verificar se um comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Header
echo "============================================================================"
echo "🚀 VALIDAÇÃO LOCAL DO PIPELINE CI/CD"
echo "============================================================================"
echo "Este script simula as validações do GitHub Actions"
echo "Execute antes de fazer push para garantir sucesso no pipeline"
echo "============================================================================"
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Verificar dependências
print_status "Verificando dependências..."

if ! command_exists node; then
    print_error "Node.js não está instalado!"
    exit 1
fi

if ! command_exists npm; then
    print_error "npm não está instalado!"
    exit 1
fi

print_success "Node.js $(node --version) e npm $(npm --version) encontrados"

# PASSO 1: Verificar vulnerabilidades CRÍTICAS
echo ""
print_status "🔍 PASSO 1: Verificando vulnerabilidades CRÍTICAS..."
if npm audit --audit-level=critical; then
    print_success "Nenhuma vulnerabilidade crítica encontrada!"
else
    print_error "Vulnerabilidades CRÍTICAS encontradas!"
    print_error "🚨 O deploy será BLOQUEADO por questões de segurança."
    print_error "Execute 'npm audit fix' para tentar corrigir automaticamente."
    exit 1
fi

# PASSO 2: Executar linting
echo ""
print_status "🧹 PASSO 2: Executando linting..."
if npm run lint; then
    print_success "Linting passou com sucesso!"
else
    print_error "Problemas de linting encontrados!"
    print_error "🚨 Corrija os erros de estilo antes do deploy."
    exit 1
fi

# PASSO 3: Executar testes unitários
echo ""
print_status "🧪 PASSO 3: Executando testes unitários..."
if npm run test:ci; then
    print_success "Todos os testes unitários passaram!"
else
    print_error "Testes unitários falharam!"
    print_error "🚨 Corrija os testes antes do deploy."
    exit 1
fi

# PASSO 4: Verificar cobertura de testes
echo ""
print_status "📊 PASSO 4: Verificando cobertura de testes..."

# Executar testes com cobertura
npm run test:coverage > /dev/null 2>&1

# Tentar extrair a cobertura do arquivo de relatório
if [ -f "coverage/lcov.info" ]; then
    # Extrair cobertura total (método alternativo)
    COVERAGE=$(grep -o "LF:[0-9]*" coverage/lcov.info | cut -d: -f2 | awk '{sum+=$1} END {print sum}')
    TOTAL=$(grep -o "LH:[0-9]*" coverage/lcov.info | cut -d: -f2 | awk '{sum+=$1} END {print sum}')
    
    if [ "$TOTAL" -gt 0 ]; then
        COVERAGE_PERCENT=$((COVERAGE * 100 / TOTAL))
        print_status "Cobertura atual: ${COVERAGE_PERCENT}%"
        
        if [ "$COVERAGE_PERCENT" -lt 80 ]; then
            print_warning "Cobertura de testes abaixo de 80% (atual: ${COVERAGE_PERCENT}%)"
            print_warning "💡 Considere aumentar a cobertura de testes."
        else
            print_success "Cobertura de testes adequada (${COVERAGE_PERCENT}%)"
        fi
    else
        print_warning "Não foi possível determinar a cobertura de testes"
    fi
else
    print_warning "Arquivo de cobertura não encontrado"
fi

# PASSO 5: Build do projeto
echo ""
print_status "🔨 PASSO 5: Executando build do projeto..."
if npm run build; then
    print_success "Build executado com sucesso!"
else
    print_error "Build falhou!"
    print_error "🚨 Corrija os erros de build antes do deploy."
    exit 1
fi

# PASSO 6: Verificar vulnerabilidades moderadas
echo ""
print_status "🛡️ PASSO 6: Verificando vulnerabilidades moderadas..."
if npm audit --audit-level=moderate; then
    print_success "Nenhuma vulnerabilidade moderada encontrada!"
else
    print_warning "Vulnerabilidades moderadas encontradas!"
    print_warning "💡 Considere atualizar as dependências afetadas."
fi

# PASSO 7: Verificações extras
echo ""
print_status "🔍 PASSO 7: Executando verificações extras..."

# Verificar console.log em produção
CONSOLE_LOGS=$(grep -r "console.log" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null || true)
if [ -n "$CONSOLE_LOGS" ]; then
    print_warning "Console.log encontrado no código:"
    echo "$CONSOLE_LOGS"
    print_warning "💡 Considere remover antes do deploy para produção."
else
    print_success "Nenhum console.log encontrado no código!"
fi

# Verificar tamanho do build
if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next | cut -f1)
    print_status "Tamanho do build: $BUILD_SIZE"
fi

# Resumo final
echo ""
echo "============================================================================"
print_success "🎉 VALIDAÇÃO LOCAL CONCLUÍDA COM SUCESSO!"
echo "============================================================================"
print_status "✅ Todas as validações críticas passaram"
print_status "✅ O pipeline CI/CD deve executar com sucesso"
print_status "🚀 Você pode fazer push com segurança"
echo "============================================================================"

# Dicas finais
echo ""
print_status "💡 Dicas para manter a qualidade:"
echo "   • Execute este script antes de cada push"
echo "   • Mantenha a cobertura de testes acima de 80%"
echo "   • Atualize dependências regularmente"
echo "   • Use 'npm run quality-check' para validação rápida"
echo ""

print_success "Pipeline seguro configurado! 🛡️" 