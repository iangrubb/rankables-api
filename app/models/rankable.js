
class Rankable {

    constructor({id, name, types, url, imageUrl, description, details, detailSource}) {
        this.id = id
        this.name = name
        this.types = types
        this.url = url
        this.imageUrl = imageUrl
        this.description = description
        this.details = details
        this.detailSource = detailSource
    }

    static async searchRankablesByTerm({ kbSource } , searchTerm) {

        const data = await kbSource.searchByTerm(searchTerm)

        return data.map(datum => {

            const adjustedDatum = {...datum, id: datum['@id'], types: datum['@type']}

            if (datum.image) {
                adjustedDatum.imageUrl = datum.image.contentUrl
            }

            if (datum.detailedDescription) {
                adjustedDatum.details = datum.detailedDescription.articleBody
                adjustedDatum.detailSource = datum.detailedDescription.url
            }

            return new Rankable(adjustedDatum)
        })
            
    }
    
    
}



module.exports = Rankable



