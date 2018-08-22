#!/usr/bin/env node
const dotenv = require('dotenv');
dotenv.config();
const gengo = require('gengo')(
  process.env.GENGO_PUBLIC_KEY,
  process.env.GENGO_PRIVATE_KEY,
  process.env.GENGO_IS_SANDBOX
);

//gengo does not use promises. This will wrap gengo functions with a promise.
function gengoPromise(func, arg) {
  return new Promise((resolve, reject) => {
    if (arg)
      return func(arg, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    return func((error, response) => {
      if (error) return reject(error);
      return resolve(response);
    });
  });
}

async function run() {
  try {
    const response = await gengoPromise(gengo.account.stats);
    // const response = await gengoPromise(gengo.jobs.create, {
    //   jobs: {
    //     job_1: {
    //       type: 'text',
    //       slug: 'Single :: English to Japanese',
    //       body_src: 'Testing Gengo API library calls.',
    //       lc_src: 'en',
    //       lc_tgt: 'ja',
    //       tier: 'standard',
    //       auto_approve: 0,
    //       comment: 'Instructions for translators on this specific job go here',
    //       attachments: [
    //         {
    //           url: 'http://example.com/image01.jpg',
    //           filename: 'image01.jpg',
    //           mime_type: 'image/jpg',
    //         },
    //         {
    //           url: 'http://example.com/video/1234',
    //           filename: 'video.mp4',
    //           mime_type: 'video/mp4',
    //         },
    //       ],
    //       // callback_url: 'http://...',
    //       custom_data: 'your optional custom data, limited to 1kb.',
    //       force: 0,
    //       use_preferred: 0,
    //     },
    //   },
    // });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
run();
