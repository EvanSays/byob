const baseRoute = 'http://localhost:6333/';

const appName   = '/byob/';
const api       = 'api/';
const version   = 'v1/';

const journals  = `${appName}${api}${version}journals/`;
const genes     = `${appName}${api}${version}genes/`;


module.exports = {
  getAllJournals: journals,
  getAllGenes: genes,
  getGenes_pubmed: `${genes}$/:pubmed`
}
