const Box = require('../models/Box');

class BoxController {
    async store(req, res) {
        const box = await Box.create(req.body);

        return res.json(box);
    }

    async show(req, res) {
        const boxes = await Box.findById(req.params.id).populate({
            path: "files",
            options: { sort: { createdAt: -1 } } // 1: crescente, -1: decrescente
        }); // populate show related schemas

        return res.json(boxes);
    }

    async showAll(req, res) {
        const boxes = await Box.find();

        return res.json(boxes);
    }
}

module.exports = new BoxController();