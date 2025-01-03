## Description

This is [Ditsmod](https://github.com/ditsmod/ditsmod) starter.

## Usage

From first terminal:

```bash
git clone --depth 1 https://github.com/ditsmod/starter.git my-app
cd my-app
npm i
```

Start in development mode:

```bash
npm run start:dev
```

You can check the server operation using `curl`:

```bash
curl -i localhost:3000/api/hello
```

Or simply by going to [http://localhost:3000/api/hello](http://localhost:3000/api/hello) in your browser.

By default, the application works with `info` log level. You can change it in the file `src/app/app.module.ts`.

Start in production mode:

```bash
npm run build
npm run start-prod
```

From second terminal, check work:

```bash
curl -i localhost:3000/api/hello
curl -i localhost:3000/api/throw-error
curl -i localhost:3000/api/body -d '{"one":1}' -H 'content-type: application/json'

# Use controller as singleton
curl -i localhost:3000/api/hello2
curl -i localhost:3000/api/throw-error2
curl -i localhost:3000/api/body2 -d '{"one":1}' -H 'content-type: application/json'
```

## Example

You can see more example usage in [ditsmod repository](https://github.com/ditsmod/ditsmod/tree/main/examples)
