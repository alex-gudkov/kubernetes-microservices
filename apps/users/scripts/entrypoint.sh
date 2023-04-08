#!/bin/bash

npm run build

npm run migration:run

npm run start:prod
