
const { RESTDataSource } = require('apollo-datasource-rest');
const e = require('express');

class KnowledgeBaseAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = 'https://kgsearch.googleapis.com/v1/entities:search'
  }

  async searchByTerm(term) {

    const modifiedQuery = term.split(" ").join("+")

    const response = await this.get('', {query: modifiedQuery, key: process.env.KG_KEY, indent: 'True', limit: 5})

    const results = response.itemListElement.map(el => el.result)

    return results
  }

}

module.exports = KnowledgeBaseAPI