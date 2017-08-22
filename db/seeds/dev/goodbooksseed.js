const csvFilePath = '../../../goodbooks-10k/books.csv';
const csv = require('csvtojson');

csv()
.fromFile(csvFilePath)
.on('json', jsonObj => {
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
})
.on('done', error => {
    console.log('end')
})




const createBook = (knex, book) => {
  return knex('books').insert({
    book_id: book.book_id,
    goodreads_title: book.goodreads_title,
    goodreads_book_id: book.goodreads_book_id,
    goodreads_work_id: book.goodreads_work_id
  }, 'book_id')
  .then(bookId => {
    let ratingPromises = []

    book.ratings.forEach(rating => {
      ratingPromises.push(
        createRating(knex, {
          user_id: rating.user_id,
          rating: rating.rating,
          book_id: bookId[0]
        })
      )
    })
  })
}

const createRating = (knex, rating) => {
  return knex('ratings').insert(rating)
}

exports.seed = (knex, Promise) => {
  return knex('ratings').del()
        .then( () => knex('books').del())
        .then( () => {
          let bookPromises = []

          booksData.forEach( book => {
            bookPromises.push(createBook(knex, book))
          })
          return Promise.all(bookPromises)
        })
        .catch(error => console.log(`error seeding data: ${error}`))
}
