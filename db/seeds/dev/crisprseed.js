const genes = require('../../crispr/genes.json')
const journals = require('../../crispr/journals.json')

const createJournal = (knex, journal) => {
  return knex('journals').insert({
    pubmed: journal.pubmed
  }, 'id')
  .then(journalId => {
    let genePromises = [];

    genes.forEach(gene => {
      if (gene.pubmed === journal.pubmed) {
        genePromises.push(createGene( knex, {
          start: gene.start,
          end: gene.end,
          chr: gene.chr,
          strand: gene.strand,
          cellline: gene.cellline,
          conditions: gene.conditions,
          sequence: gene.sequence,
          symbol: gene.symbol,
          ensg: gene.ensg,
          log2fc: gene.log2fc,
          rc_initial: gene.rc_initial,
          rc_final: gene.rc_final,
          effect: gene.effect,
          cas: gene.cas,
          screentype: gene.screentype,
          pubmed_journal: gene.pubmed_journal
        }))
      }
    })
    return Promise.all(genePromises)
  })
}

const createGene = (knex, gene) => {
  return knex('genes').insert(gene)
}

exports.seed = (knex, Promise) => {
  return knex('genes').del()
  .then(() => knex('journals').del())
  .then(() => {
    let journalPromises = []

    journals.forEach(journal => {
      journalPromises.push(createJournal(knex, journal))
    })
    return Promise.all(journalPromises)
  })
  .catch(error => console.log(`error seeding data: ${error}`))
}
