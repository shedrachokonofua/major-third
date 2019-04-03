import axios from "axios";

async function makeRequest(start:number = timestamp(), calls:number = 0) {
  const response = await axios({
    url: 'https://rateyourmusic.com',
    validateStatus: status => [200, 503].includes(status)
  });
  const code = response.status;
  if(code === 200) {
    return makeRequest(start, ++calls);
  }
  console.log({
    start,
    calls,
    end: timestamp()
  })
}

function timestamp():number {
  return new Date().getTime();
}
//makeRequest();