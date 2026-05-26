import js from '@eslint/js'
import globals from 'globals'
import jsdoc from 'eslint-plugin-jsdoc'

export default [
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc: jsdoc
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^[A-Z_]', 'varsIgnorePattern': '^[A-Z_]' }],
      'jsdoc/require-jsdoc': ['warn', { 
        publicOnly: false, 
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true
        }
      }],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/valid-types': 'warn'
    }
  }
]