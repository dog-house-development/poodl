const secrets = {
  dbUri: 'mongodb://DogHouseDevelopment:WhereIsTheMummy88!@ds213715.mlab.com:13715/poodl'
};

export const getSecret = key => secrets[key];
