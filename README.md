## BYOB CRISPR API

[![CircleCI](https://circleci.com/gh/EvanSays/byob/tree/master.svg?style=svg)](https://circleci.com/gh/EvanSays/byob/tree/master)

BYOB provides access to the Crispr genes and the Journals who first published them.

The API is REST API and uses JWT for authentication purposes. The return format for all end points is JSON.

---

## Endpoints

#### Journal Resources

- **[<code>GET</code> journals](https://github.com/EvanSays/byob/blob/master/docs/GET_journals.md)** +
- **[<code>POST</code> journals](https://github.com/EvanSays/byob/blob/master/docs/POST_journals.md)** +
- **[<code>GET</code> journals/:pubmed](https://github.com/EvanSays/byob/blob/master/docs/GET_journals_pubmed.md)** +
- **[<code>PATCH</code> journals/:pubmed](https://github.com/EvanSays/byob/blob/master/docs/PATCH_journals_pubmed.md)** +
- **[<code>GET</code> journals/:pubmed/genes](https://github.com/EvanSays/byob/blob/master/docs/GET_genes.md)** +
- **[<code>DELETE</code> journals/:pubmed/genes](https://github.com/EvanSays/byob/blob/master/docs/DELETE_journals_pubmed_genes.md)** +

#### Gene Resources

- **[<code>GET</code> genes](https://github.com/EvanSays/byob/blob/master/docs/GET_genes.md)** +
- **[<code>POST</code> genes](https://github.com/EvanSays/byob/blob/master/docs/GET_genes_id.md)** +
- **[<code>GET</code> genes/:id](https://github.com/EvanSays/byob/blob/master/docs/GET_genes_id.md)** +
- **[<code>PATCH</code> genes/:id](https://github.com/EvanSays/byob/blob/master/docs/PATCH_genes_id.md)** +
- **[<code>DELETE</code> genes/:id](https://github.com/EvanSays/byob/blob/master/docs/DELETE_genes_id.md)** +

## Authentication
- **[<code>POST</code> admin](https://github.com/EvanSays/byob/blob/master/docs/Auth.md)** +
