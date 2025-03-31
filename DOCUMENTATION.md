# Documentação do Desenvolvedor - Bella Rosa Landing Page

## Estrutura do Projeto

```
bella-rosa-landing-page/
├── public/                 # Arquivos estáticos
├── src/                    # Código fonte
│   ├── components/         # Componentes React
│   │   ├── IntroAnimation.tsx  # Animação introdutória
│   │   ├── Hero.tsx        # Seção principal/hero
│   │   ├── Services.tsx    # Seção de serviços
│   │   ├── About.tsx       # Seção sobre o salão
│   │   ├── Testimonials.tsx # Seção de depoimentos
│   │   ├── AppointmentForm.tsx # Formulário de agendamento
│   │   └── ScrollManager.tsx # Gerenciador de scroll e animações
│   ├── App.tsx             # Componente principal
│   ├── index.css           # Estilos globais
│   └── main.tsx            # Ponto de entrada da aplicação
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
├── vite.config.js          # Configuração do Vite
└── index.html              # Página HTML de entrada
```

## Componentes

### IntroAnimation

Este componente exibe a animação de entrada quando o site é carregado. Utiliza GSAP para animar elementos e tem um efeito de "desaparecimento" quando o usuário rola para baixo.

### Hero

A seção principal do site, exibida após a animação de introdução. Apresenta:
- Título e subtítulo
- Texto de introdução
- Botões de call-to-action
- Imagem destacada
- Elementos decorativos animados

### Services

Exibe os serviços oferecidos pelo salão em um layout de grid. Cada serviço tem:
- Ícone
- Título
- Lista de procedimentos com preços e descrições
- Botão de agendamento

### About

Apresenta informações sobre o salão, incluindo:
- História e missão
- Estatísticas animadas (contadores)
- Imagem do salão
- Botões de ação

### Testimonials

Exibe depoimentos dos clientes em:
- Grid para desktop
- Carrossel para mobile
- Estatísticas e reviews

### AppointmentForm

Formulário para agendamento, com:
- Campos para informações do cliente
- Seleção de serviços
- Data e hora preferidas
- Mensagem
- Botão de envio

### ScrollManager

Gerencia as animações baseadas em scroll usando o GSAP ScrollTrigger e coordena a navegação entre seções.

## Animações

### Tipos de Animações

1. **Animações de Entrada**: Elementos que aparecem quando entram na viewport
2. **Animações Contínuas**: Elementos decorativos com movimento contínuo
3. **Animações de Contagem**: Contadores que incrementam até um valor final
4. **Animações de Hover**: Interações quando o usuário passa o mouse sobre elementos

### Implementação

As animações são implementadas usando duas bibliotecas principais:

- **GSAP (GreenSock Animation Platform)**: Para animações complexas, sincronizadas com o scroll e contadores
- **Framer Motion**: Para animações de componentes React, como hover e efeitos de interface

Exemplo de animação GSAP com ScrollTrigger:

```typescript
useEffect(() => {
  if (contentRef.current) {
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: window.innerWidth < 768 ? 0.5 : 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: window.innerWidth < 768 ? 1 : 2,
          toggleActions: "play none none reverse"
        }
      }
    );
  }
}, []);
```

## Responsividade

O site foi desenvolvido com abordagem mobile-first e se adapta a diversos tamanhos de tela:

1. **Mobile**: Layout de uma coluna, elementos redimensionados, carrossel para depoimentos
2. **Tablet**: Layout intermediário com duas colunas para serviços
3. **Desktop**: Layout completo com três colunas para serviços e grid para depoimentos

As animações também são otimizadas para dispositivos móveis, com:

```typescript
// Exemplo de otimização de animação para mobile
const duration = window.innerWidth < 768 ? 0.5 : 1;
```

## Estilo e Tema

O tema visual é definido no arquivo `tailwind.config.js` com cores personalizadas:

```js
theme: {
  extend: {
    colors: {
      'beauty-pink': {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337'
      },
      'beauty-purple': {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87'
      }
    },
    boxShadow: {
      'beauty': '0 10px 25px -5px rgba(244, 63, 94, 0.2)'
    }
  }
}
```

## Como Adicionar Novos Serviços

Para adicionar um novo serviço, edite o array `services` no componente `Services.tsx`:

```typescript
const services = [
  // Serviço existente
  {
    category: "Nome da Categoria",
    icon: "SVG path",
    items: [
      { name: "Nome do Serviço", price: "R$ XX,XX", description: "Descrição" },
      // Adicione mais itens conforme necessário
    ]
  },
  // Adicione mais categorias de serviços aqui
];
```

## Como Adicionar Novos Depoimentos

Para adicionar um novo depoimento, edite o array `testimonials` no componente `Testimonials.tsx`:

```typescript
const testimonials = [
  // Depoimento existente
  {
    id: 5, // Incrementar ID
    name: "Nome do Cliente",
    role: "Cliente desde 20XX",
    image: "URL da imagem",
    stars: 5, // Avaliação de 1 a 5
    text: "Texto do depoimento do cliente"
  },
  // Adicione mais depoimentos aqui
];
```

## Considerações de Performance

Para garantir boa performance, especialmente em dispositivos móveis:

1. **Carregamento Condicional**: Algumas animações são simplificadas em dispositivos móveis
2. **Otimização de Imagens**: Imagens devem ser otimizadas antes do upload
3. **Lazy Loading**: Implementado para componentes que não são visíveis imediatamente
4. **Memória**: Limpeza de animações GSAP quando componentes são desmontados

## Extensões Futuras

Ideias para melhorar o site no futuro:

1. **Integração com API de Agendamento**: Conectar o formulário a um sistema real
2. **Galeria de Trabalhos**: Adicionar uma seção para exibir trabalhos realizados
3. **Blog**: Implementar uma seção de dicas e novidades
4. **Temas Alternativos**: Criar opções de tema escuro/claro
5. **Multilíngue**: Adicionar suporte para outros idiomas

## Deploy

### Deploy na Vercel

A Vercel é uma plataforma de hospedagem recomendada para este projeto, pois oferece ótimo suporte para aplicações React/Vite.

#### Procedimento de Deploy

1. **Preparação**:
   - Certifique-se de que o arquivo `vercel.json` está na raiz do projeto (já incluído)
   - Verifique se todas as dependências estão corretamente listadas no `package.json`
   - Execute `npm run build` localmente para garantir que o projeto compila sem erros

2. **Deploy via GitHub**:
   - Crie uma conta na [Vercel](https://vercel.com)
   - Faça login e clique em "New Project"
   - Conecte sua conta do GitHub e selecione o repositório
   - Nas configurações, confirme:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Configure as variáveis de ambiente se necessário
   - Clique em "Deploy"

3. **Deploy via CLI**:
   ```bash
   # Instale a CLI da Vercel
   npm i -g vercel
   
   # Faça login
   vercel login
   
   # Deploy (no diretório do projeto)
   vercel
   
   # Para ambiente de produção
   vercel --prod
   ```

4. **Atualizações**:
   - Se o projeto estiver conectado ao GitHub, cada novo push para a branch main/master resultará em um novo deploy
   - Para atualizações manuais, use `vercel --prod`

5. **Domínio Personalizado**:
   - No dashboard da Vercel, vá para as configurações do projeto
   - Selecione "Domains"
   - Adicione seu domínio personalizado e siga as instruções para configuração DNS

### Otimizações para Produção

1. **Compressão de Imagens**:
   - Antes do deploy final, otimize todas as imagens usando ferramentas como TinyPNG ou Squoosh
   - Considere converter formatos para WebP onde possível

2. **Analytics**:
   - Adicione Google Analytics ou Vercel Analytics para monitorar o tráfego

3. **SEO**:
   - Atualize as meta tags no arquivo `index.html` para melhorar o SEO
   - Adicione um sitemap.xml para melhor indexação

---

## Solução de Problemas Comuns

### Animações não aparecem

Verifique se:
- GSAP e ScrollTrigger estão registrados corretamente
- Os refs estão conectados aos elementos DOM
- As animações são limpas nos retornos dos useEffects

### Elementos não responsivos

- Teste em diferentes tamanhos de tela
- Verifique as classes condicionais do Tailwind
- Use as ferramentas de desenvolvimento do navegador para inspecionar elementos

### Formulário não funciona

- Verifique se os handlers de evento estão conectados
- Verifique a validação dos campos
- Teste a submissão com console.logs 