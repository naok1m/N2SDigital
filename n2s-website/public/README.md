# Estrutura da Pasta Public

Esta pasta contém todos os arquivos estáticos do projeto N2S Group Website.

## 📁 Estrutura de Pastas

```
public/
├── docs/                    # Documentação
│   └── EMAIL_SETUP.md      # Guia de configuração do sistema de email
├── images/                 # Imagens organizadas por categoria
│   ├── backgrounds/        # Imagens de fundo e texturas
│   │   ├── blackhole.webp
│   │   ├── noise.webp
│   │   └── pattern.webp
│   ├── elements/           # Elementos visuais e efeitos
│   │   ├── arco.webp
│   │   ├── arco2.webp
│   │   ├── asteroides.webp
│   │   ├── correntes.webp
│   │   ├── estela.webp
│   │   ├── lightning.webp
│   │   ├── liquid-globe.webp
│   │   ├── liquidos.webp
│   │   ├── love.webp
│   │   ├── nuvens-baixo.webp
│   │   ├── nuvens-cima.webp
│   │   └── planeta.webp
│   └── ui/                 # Elementos de interface
│       ├── banner-cta.webp
│       ├── banner-cta2.webp
│       └── banner-cta3.webp
├── scripts/                # Scripts PHP e backend
│   └── send-email.php      # Script para envio de emails
├── videos/                 # Vídeos
│   └── Noxus.mp4
├── manifest.json           # Manifesto PWA
├── robots.txt              # Configurações de SEO
├── sitemap.xml             # Mapa do site
├── sw.js                   # Service Worker
└── .htaccess               # Configurações do Apache
```

## 🎨 Categorização das Imagens

### Backgrounds (`/images/backgrounds/`)
- **blackhole.webp**: Buraco negro usado na seção "Sobre Nós"
- **noise.webp**: Textura de ruído usada em várias seções
- **pattern.webp**: Padrão de fundo usado na seção de projetos

### Elements (`/images/elements/`)
- **arco.webp**: Arco usado na seção de projetos
- **arco2.webp**: Arco usado nas seções de serviços e contato
- **asteroides.webp**: Asteroides para efeitos visuais
- **correntes.webp**: Efeito de correntes no hero
- **estela.webp**: Estela usada na seção de projetos
- **lightning.webp**: Efeito de raios
- **liquid-globe.webp**: Globo líquido usado na página 404
- **liquidos.webp**: Efeito líquido no hero
- **love.webp**: Elemento de amor
- **nuvens-baixo.webp**: Nuvens inferiores
- **nuvens-cima.webp**: Nuvens superiores
- **planeta.webp**: Planeta central no hero

### UI (`/images/ui/`)
- **banner-cta.webp**: Banner de call-to-action
- **banner-cta2.webp**: Banner de call-to-action alternativo
- **banner-cta3.webp**: Banner de call-to-action terceiro

## 🎬 Vídeos (`/videos/`)
- **Noxus.mp4**: Vídeo de demonstração usado no hero

## 🔧 Scripts (`/scripts/`)
- **send-email.php**: Script PHP para processar formulários de contato

## 📚 Documentação (`/docs/`)
- **EMAIL_SETUP.md**: Guia completo para configuração do sistema de email

## 🔗 Como Usar

### Imagens
```html
<!-- Background -->
<div style="background-image: url('/images/backgrounds/blackhole.webp')"></div>

<!-- Elemento -->
<img src="/images/elements/planeta.webp" alt="Planeta" />

<!-- UI -->
<img src="/images/ui/banner-cta.webp" alt="Banner" />
```

### Vídeos
```html
<video src="/videos/Noxus.mp4" autoplay loop muted></video>
```

### Scripts
```javascript
fetch('/scripts/send-email.php', {
  method: 'POST',
  body: formData
});
```

## 🚀 Benefícios da Organização

1. **Estrutura Clara**: Fácil localização de arquivos
2. **Manutenção**: Organização por categoria facilita atualizações
3. **Performance**: Carregamento otimizado por tipo de conteúdo
4. **SEO**: Estrutura amigável para mecanismos de busca
5. **Escalabilidade**: Fácil adição de novos arquivos

## 📝 Notas Importantes

- Todos os caminhos foram atualizados nos componentes React
- A estrutura é compatível com o sistema de build do Vite
- Arquivos de configuração permanecem na raiz da pasta public
- Documentação está organizada na pasta docs

