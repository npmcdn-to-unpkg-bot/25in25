import kue from 'kue'
import email from './email'

export const queue = kue.createQueue({
  redis: process.env.REDIS_URL
})

queue.process('email', (job, done) => {
  console.log('queing email', job.id, job.data)
  email(job.id, job.data, done)
})
