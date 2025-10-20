#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Limpando cache do projeto...\n');

// Diretórios para limpar
const dirsToClean = [
  'node_modules/.vite',
  'node_modules/.cache',
  'dist',
  '.vite'
];

// Arquivos para remover
const filesToClean = [
  'package-lock.json'
];

let cleaned = 0;

// Limpar diretórios
dirsToClean.forEach(dir => {
  const fullPath = path.resolve(dir);
  if (fs.existsSync(fullPath)) {
    console.log(`📁 Removendo diretório: ${dir}`);
    fs.rmSync(fullPath, { recursive: true, force: true });
    cleaned++;
  }
});

// Limpar arquivos
filesToClean.forEach(file => {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    console.log(`📄 Removendo arquivo: ${file}`);
    fs.unlinkSync(fullPath);
    cleaned++;
  }
});

console.log(`\n✅ Cache limpo! ${cleaned} itens removidos.`);
console.log('\n💡 Dicas:');
console.log('   • Use "npm run dev:no-cache" para desenvolvimento sem cache');
console.log('   • Use "npm run build:clean" para build limpo');
console.log('   • Reinicie o servidor após limpar o cache\n');
