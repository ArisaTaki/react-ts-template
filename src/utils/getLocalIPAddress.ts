import os from 'os';

const getLocalIPAddress = () => {
  const nets = os.networkInterfaces();
  const results = Object.create(null);

  // eslint-disable-next-line no-restricted-syntax
  for (const name of Object.keys(nets)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results.en0 ? results.en0[0] : results.en1[0];
};

export default getLocalIPAddress();
