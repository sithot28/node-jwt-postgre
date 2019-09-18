# node-jwt-postgre

Why TypeScript ?
Just to keep our coding habbit away away away from painful bugs, from cowboys coding habbit of javascript. :)

A boilerplate to speedup up development of REST API with nodeJS using express. PostgreSQL database used as backend of API.
Authentication method using JWT, with auto renew TOKEN expiry every time protected resources access, if client not active more than expiry time, than should do re-login.

pg npm module used as Database connection, with minimal additional function to do basic postgresql operation, like query, transaction etc. 

1. npm install
2. npm run build-ts
3. npm run watch
