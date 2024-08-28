## Quick start

### Requierd

```
node version > 18
```

### Create .env

```
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_NAME=code-nest
DATABASE_PASSWORD=

JWT_SECRET=
```

### Start

```
pnpm install
pnpm g:jwt-secret
```

### Command line with Docker

```
make d-build
make d-up
```

### Url

http://localhost:8000/
