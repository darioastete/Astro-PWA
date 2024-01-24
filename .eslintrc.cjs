module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  files: ['*.astro'],
  plugins: ['solid', 'astro'],
  extends: [
    'eslint:recommended',
    'plugin:solid/recommended',
    'plugin:astro/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.js', '.eslintrc.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.astro'],
    sourceType: 'module',
  },
  rules: {
    'solid/reactivity': 'warn',
    'solid/no-destructure': 'warn',
    'solid/jsx-no-undef': 'error',
    'astro/space-bracket': ['error', 'always'],
    // Agrega cualquier regla adicional que necesites para tu proyecto
  },
};
