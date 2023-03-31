# Tests

Required dependencies:

```TEXT
$ npm install @nestjs/testing @types/jest @types/supertest jest supertest ts-jest --save-dev
```


```JSON
{
    "scripts": {
        "jest": "jest",
        "jest:watch": "jest --watch",
        "jest:coverage": "jest --coverage",
        "jest:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
        "jest:e2e": "jest --config ./test/jest-e2e.json",
    },
    
    /* ... */

    "jest": {
        "moduleFileExtensions": [
            "js",
            "json",
            "ts"
        ],
        "rootDir": "./src",
        "testRegex": ".*\\.spec\\.ts$",
        "transform": {
            "^.+\\.(t|j)s$": "ts-jest"
        },
        "collectCoverageFrom": [
            "**/*.(t|j)s"
        ],
        "coverageDirectory": "../coverage",
        "testEnvironment": "node"
    }
}
```
