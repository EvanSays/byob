## BYOB CRISPR API

[![CircleCI](https://circleci.com/gh/EvanSays/byob/tree/master.svg?style=svg)](https://circleci.com/gh/EvanSays/byob/tree/master)

BYOB provides access to the Crispr genes and the Journals who first published them.

The API is REST API and uses JWT for authentication purposes. The return format for all end points is JSON.

---

## Endpoints

#### Journal Resources

- **[<code>GET</code> journals]()** +
- **[<code>POST</code> journals]()** +
- **[<code>GET</code> journals/:pubmed]()** +
- **[<code>PATCH</code> journals/:pubmed]()** +
- **[<code>GET</code> journals/:pubmed/genes]()** +
- **[<code>DELETE</code> journals/:pubmed/genes]()** +

#### Gene Resources

- **[<code>GET</code> genes]()** +
- **[<code>POST</code> genes]()** +
- **[<code>GET</code> genes/:id]()** +
- **[<code>PATCH</code> genes/:id]()** +
- **[<code>DELETE</code> genes/:id]()** +

## Authentication
- **[<code>POST</code> admin](https://github.com/EvanSays/byob/blob/master/docs/Auth.md)** +
