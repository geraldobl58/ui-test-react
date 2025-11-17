# React Component Showcase

Aplicação interativa demonstrando componentes **Select** e **Switch** reutilizáveis, construídos com React, TypeScript e SASS.

## 🚀 Demo

A aplicação permite customizar e testar os componentes em tempo real através de uma interface interativa.

## 📦 Componentes

### Select Component

Componente de seleção customizado com as seguintes características:

- **Interface de opções**: Aceita array de objetos `[{value: "value", label: "Label"}]`
- **Componente controlado**: Gerenciado via props `value` e `onChange`
- **Estado desabilitado**: Suporte para `disabled`
- **Placeholder customizável**
- **Navegação por teclado**: Enter, Space, Tab
- **Click-outside**: Fecha automaticamente ao clicar fora
- **Acessibilidade**: Atributos ARIA completos

**Uso:**
```tsx
import { Select } from './components/Select';

const options = [
  { value: 'op1', label: 'Opção 1' },
  { value: 'op2', label: 'Opção 2' },
];

<Select
  options={options}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  disabled={false}
  placeholder="Selecione uma opção"
/>
```

### Switch Component

Componente de alternância (toggle) com as seguintes características:

- **Valores booleanos**: true/false
- **Componente controlado**: Gerenciado via props `checked` e `onChange`
- **Estado desabilitado**: Suporte para `disabled`
- **Label opcional**: Texto ao lado do switch
- **Eventos**: Callback `onChange` retorna o valor atual
- **Navegação por teclado**: Enter, Space
- **Acessibilidade**: Atributos ARIA e role="switch"

**Uso:**
```tsx
import { Switch } from './components/Switch';

<Switch
  checked={isEnabled}
  onChange={(checked) => setIsEnabled(checked)}
  disabled={false}
  label="Ativar recurso"
/>
```

## 🎨 Funcionalidades da Demo

A aplicação de demonstração oferece:

1. **Preview em tempo real**: Visualize os componentes com as configurações atuais
2. **Controles interativos**: 
   - Ativar/desativar estados
   - Adicionar/remover opções do Select
   - Alternar valores programaticamente
3. **Log de eventos**: Monitore todas as interações em tempo real
4. **Documentação integrada**: Veja APIs e interfaces diretamente na página

## 🛠️ Tecnologias

- **React 19.2.0** - Biblioteca UI
- **TypeScript 5.9.3** - Tipagem estática
- **Vite 7.2.2** - Build tool e dev server
- **SASS/SCSS** - Preprocessador CSS com sistema de design

## 📋 Instalação

```bash
# Clone o repositório
git clone https://github.com/geraldobl58/ui-test-react.git

# Entre na pasta
cd ui-test-react

# Instale as dependências
npm install
```

## 🚀 Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

A aplicação estará disponível em `http://localhost:5173`

## 📂 Estrutura

```
src/
├── styles/
│   └── _variables.scss      # Sistema de design (cores, espaçamentos, mixins)
├── components/
│   ├── Select/
│   │   ├── Select.tsx       # Lógica do componente
│   │   ├── Select.scss      # Estilos
│   │   └── index.ts         # Exports
│   └── Switch/
│       ├── Switch.tsx       # Lógica do componente
│       ├── Switch.scss      # Estilos
│       └── index.ts         # Exports
├── App.tsx                  # Aplicação demo
├── App.scss                 # Estilos da demo
└── main.tsx                 # Entry point
```

## 🎯 Sistema de Design (SASS)

O projeto utiliza SASS com um sistema de design centralizado:

**Variáveis disponíveis:**
- Cores: `$primary-color`, `$success-color`, `$danger-color`, `$gray-*`
- Espaçamentos: `$spacing-xs`, `$spacing-sm`, `$spacing-md`, `$spacing-lg`
- Border radius: `$border-radius-sm`, `$border-radius-md`, `$border-radius-lg`
- Transições: `$transition-fast`, `$transition-base`, `$transition-slow`
- Tipografia: `$font-family-base`, `$font-size-*`, `$font-weight-*`

**Mixins disponíveis:**
```scss
@include transition($property, $duration, $timing);
@include box-shadow($shadow);
@include focus-ring($color);
@include disabled-state;
@include media-md { /* styles */ };
```

## ✨ Características

- ✅ **TypeScript**: Tipagem completa em todos os componentes
- ✅ **Acessibilidade**: ARIA, navegação por teclado, foco visível
- ✅ **Responsivo**: Funciona em desktop, tablet e mobile
- ✅ **Componentes controlados**: Padrão React para gerenciamento de estado
- ✅ **Reutilizáveis**: Fácil integração em qualquer projeto
- ✅ **Documentado**: Interfaces TypeScript e exemplos de uso
- ✅ **Sistema de design**: SASS com variáveis e mixins centralizados
- ✅ **Sem bibliotecas externas**: Componentes construídos do zero

## 📝 Como Usar em Outro Projeto

1. Copie a pasta `src/components/Select` ou `src/components/Switch`
2. Copie o arquivo `src/styles/_variables.scss` (opcional, mas recomendado)
3. Importe e use:

```tsx
import { Select } from './components/Select';
import { Switch } from './components/Switch';

function MyApp() {
  const [value, setValue] = useState('');
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Select
        options={[
          { value: '1', label: 'Opção 1' },
          { value: '2', label: 'Opção 2' },
        ]}
        value={value}
        onChange={setValue}
      />

      <Switch
        checked={enabled}
        onChange={setEnabled}
        label="Ativar"
      />
    </>
  );
}
```

