const Publication = require('../models/publication')

function getPublications(req, res) {
    Publication.find().exec((err, publications) => {
        if (err)
            res.status(500).send({ message: `request error: ${err}` })
        else {
            if (!publications)
                res.status(404).send({ message: `there are no publications` })
            else
                res.status(200).send({ publications })
        }
    })
}

function getPublicationById(req, res) {
    let publicationId = req.params.publicationId

    Publication.findOneAndUpdate({ _id: publicationId }, (err, publication) => {
        if (err) 
            return res.status(500).send({ message: `request error: ${err}` })
        if (!publication) 
            return res.status(404).send({ message: 'the publication dont exist' })

        res.status(200).send({ publication })
    })
}

function updatePublication(req, res) {
    const publicationId = req.params.publicationId
    const update = req.body

    Publication.findByIdAndUpdate(publicationId, update, (err, publicationUpdated) => {
        if (err) 
            res.status(500).send({ message: `error updating publication: ${err}` })

        res.status(200).send({ publication: publicationUpdated })
    })
}

function deletePublication(req, res) {
    let publicationId = req.params.publicationId

    Publication.findById(publicationId, (err, publication) => {
        if (err) 
            res.status(500).send({ message: `error deleting Publication: ${err}` })

            publication.remove(err => {
            if (err) 
                res.status(500).send({ message: `error deleting publication: ${err}` })
            
            res.status(200).send({ message: 'the publication has been deleted' })
        })
    })
}

module.exports = {
    getPublications,
    updatePublication,
    getPublicationById,
    deletePublication
}