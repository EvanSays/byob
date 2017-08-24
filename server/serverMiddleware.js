const   jwt     = require('jsonwebtoken')
const   express = require('express')
const   app     = express()
const { secretKey } = require('./routes')

const checkAuth = (req, res, next) => {
  const tokenPiece = req.headers.authorization

  if (!tokenPiece) {
    return res.status(403).json('You must have be authorized to do this action. Contact your computer guy')
  }

  jwt.verify(tokenPiece, secretKey, (error, decoded) => {

    if (error) {
      return res.status(403).json({message:'Gandalf says you shall not pass', error: error})
    }

    decoded.admin ? next() : res.status(403).json({error: 'you must have admin privledges'})
  })
}

module.exports = {
  checkAuth: checkAuth
}
