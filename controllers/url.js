const shortid = require('shortid');
const URL = require('../models/url')

async function HandleUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({message: 'URL is required'});
    const shortID = shortid();
    await  URL.create({
        shortID: shortID,
        redirectURL : body.url,
        visitedHistory : []
    });

    return res.json({id : shortID});
}

async function HandleAnalytics(req, res) {
    const shortID = req.params.shortID;
    const Result = await URL.findOne({shortID})
    return res.json({totalClick: Result.visitedHistory.length,
        analytics : Result.visitedHistory})
}

module.exports = {
    HandleUrl,HandleAnalytics 
}