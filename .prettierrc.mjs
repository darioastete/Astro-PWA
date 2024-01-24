export default {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      files: '*.{jsx,tsx}',
      options: {
        parser: 'typescript',
        // Otras opciones específicas para SolidJS...
      },
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
  ],
  trailingComma: 'all',
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  bracketSameLine: true,
  vueIndentScriptAndStyle: true,
  htmlWhitespaceSensitivity: 'strict',
};
