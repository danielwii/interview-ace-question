## AceEducation Question

Server: nextjs/micro/apollo-server/typeorm
Client: nextjs/apollo-client/react/bulma

## Development

```bash
# run test db
docker run --name pg -e POSTGRES_PASSWORD=test-only -d postgres
```

## Test

```bash
yarn test
```

## Run in docker

```bash
# build image
docker build -t ace --build-arg REGISTRY=https://registry.npm.taobao.org .
# or just
docker build -t ace .

# run
docker run --rm -it -e DB_HOST=db-host -e DB_DATABASE=db-name -e DB_USERNAME=db-username -e DB_PASSWORD=db-password -p 3000:3000 ace
open localhost:3000
```
