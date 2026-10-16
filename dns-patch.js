const dns = require('dns');

// 1. Force IPv4 first globally
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

// 2. Intercept dns.lookup to force IPv4 (family: 4)
const originalLookup = dns.lookup;
dns.lookup = function(hostname, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  if (typeof options === 'number') {
    options = { family: options };
  } else {
    options = Object.assign({}, options);
  }
  
  if (hostname === 'api.telegram.org') {
    if (options.all) {
      return callback(null, [{ address: '149.154.166.110', family: 4 }]);
    }
    return callback(null, '149.154.166.110', 4);
  }

  // Force IPv4 for everything so undici/fetch never tries broken IPv6
  options.family = 4;
  return originalLookup.call(dns, hostname, options, callback);
};

if (dns.promises && dns.promises.lookup) {
  const originalPromisesLookup = dns.promises.lookup;
  dns.promises.lookup = async function(hostname, options) {
    options = options || {};
    if (typeof options === 'number') {
      options = { family: options };
    } else {
      options = Object.assign({}, options);
    }
    if (hostname === 'api.telegram.org') {
      if (options.all) {
        return [{ address: '149.154.166.110', family: 4 }];
      }
      return { address: '149.154.166.110', family: 4 };
    }
    options.family = 4;
    return originalPromisesLookup.call(dns.promises, hostname, options);
  };
}
