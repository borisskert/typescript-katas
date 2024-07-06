import love from 'eslint-config-love'
import tseslint from 'typescript-eslint'

export default [
  love,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      tseslint: tseslint
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': ['error', {
        allowNumber: true,
      }],
      "@typescript-eslint/unbound-method": ['error', {
        ignoreStatic: true,
      }],
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  {
    ignores: ['dist/**/*.*', '**/*.js', '**/*.mjs']
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json']
      }
    }
  },
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.test.json']
      }
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': ['error', {
        allowNumber: true,
      }],
    }
  }
]
