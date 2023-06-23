import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Connected Successfully!')
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM is Received')
  if (server) {
    server.close()
  }
})
