# Bella Rosa - Landing Page de Salão de Beleza

![Bella Rosa](https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80)

Uma landing page moderna, responsiva e elegante para o salão de beleza "Bella Rosa", desenvolvida com React, TypeScript, GSAP e Tailwind CSS.

## 🌟 Características

- **Design Responsivo**: Experiência otimizada para dispositivos móveis, tablets e desktops
- **Animações Sofisticadas**: Animações elegantes com GSAP e Framer Motion
- **Carregamento Rápido**: Otimizado para performance mesmo em dispositivos móveis
- **Interface Intuitiva**: Navegação simplificada e clara para os clientes
- **SEO Amigável**: Estrutura otimizada para mecanismos de busca
- **Seções Interativas**: Depoimentos, serviços e formulário de agendamento

## 🚀 Seções

- **Intro/Hero**: Animação inicial atraente e seção principal com call-to-action
- **Serviços**: Exibição detalhada de todos os serviços oferecidos com preços
- **Sobre**: História e informações sobre o salão, com estatísticas animadas
- **Depoimentos**: Feedback de clientes reais com sistema de carrossel em dispositivos móveis
- **Agendamento**: Formulário de contato para agendamento de serviços

## 💻 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para código mais seguro
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **GSAP**: Biblioteca de animação profissional
- **Framer Motion**: Biblioteca de animação para componentes React
- **ScrollTrigger**: Plugin GSAP para animações baseadas em scroll

## 🛠️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/bella-rosa-landing-page.git
   cd bella-rosa-landing-page
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173
   ```

## 📱 Otimização Mobile

O site foi cuidadosamente otimizado para dispositivos móveis, com:
- Ajustes automáticos de velocidade de animação para melhor performance
- Layout responsivo que se adapta a diferentes tamanhos de tela
- Elementos interativos dimensionados para uso em touchscreen
- Carrossel touch-friendly para depoimentos
- Tempos de carregamento reduzidos

## 🚀 Deploy na Vercel

1. **Método 1: Deploy direto pelo GitHub**

   - Faça login na [Vercel](https://vercel.com)
   - Clique em "New Project"
   - Conecte sua conta do GitHub e selecione este repositório
   - Configurações recomendadas:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Clique em "Deploy"

2. **Método 2: Deploy pela CLI**

   - Instale a Vercel CLI:
     ```bash
     npm i -g vercel
     ```
   - No diretório do projeto, execute:
     ```bash
     vercel login
     vercel
     ```
   - Siga as instruções para completar o deploy

3. **Método 3: Deploy manual pela UI da Vercel**

   - Construa o projeto localmente:
     ```bash
     npm run build
     ```
   - Arraste e solte a pasta `dist` na área de upload na interface da Vercel

O projeto já inclui um arquivo `vercel.json` com as configurações necessárias para deploy.

## 🎨 Personalização

O tema visual pode ser facilmente personalizado alterando as variáveis no arquivo `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'beauty-pink': { ... },
      'beauty-purple': { ... }
    }
  }
}
```

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

Desenvolvido com ❤️ para o salão de beleza "Bella Rosa" 