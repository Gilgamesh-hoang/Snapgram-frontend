module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "plugin:react/recommended",
        "plugin:tailwindcss/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-unused-vars": "off"
    }
}