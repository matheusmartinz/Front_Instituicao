import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    // Ignorar pasta de build
    {
        ignores: ['dist', 'node_modules'],
    },

    // Config para arquivos TypeScript com React (TSX/TS)
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            ecmaVersion: 'latest',
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Regras base do JS + TS
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,

            // React Hooks
            ...reactHooks.configs.recommended.rules,

            // Regras customizadas
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^[A-Z_]',
                    argsIgnorePattern: '^_',
                },
            ],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // 👉 Aqui desliga o alerta de dupla negação
            'no-extra-boolean-cast': 'off',
        },
    },
];
