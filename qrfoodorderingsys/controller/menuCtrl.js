const Menu = require('../model/menu.js');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''

});

const menuctr = {
    create: async (req, res) => {
        try {
            const file = req.files.photo;
            console.log(file)
            cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                console.log(result);

                // Validate request
                if (!req.body) {
                    return res.status(400).send({
                        message: "Menu content can not be empty"
                    });
                }

                // Create a Menu
                const menu = new Menu({
                    name: req.body.name || "Untitled Menu",
                    price: req.body.price,
                    category: req.body.category,
                    imagePath: result.url

                });

                // Save Menu in the database
                menu.save()
                res.send("done")
            })

        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }

    },

    findall: async (req, res) => {
        try {
            const menu = await Menu.find();
            console.log(menu)
            res.send(menu);
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    findOne: async (req, res) => {
        try {

            const id = req.params.id
            const menu = await Menu.findById({ _id: id })

            if (!menu) {
                return res.status(400).send({
                    message: "menu empty"
                });
            }
            res.send(menu)
            console.log(menu)

        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id
            const file = req.files.photo;
            let imagePath
            console.log(file)
            cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                const name = req.body.name
                const price = req.body.price
                const category = req.body.category
                const imagePath = result.url

                console.log(imagePath)

                Menu.findOneAndUpdate({ _id: id }, {
                    name, price, category, imagePath
                });
            })


            res.json({ msg: "data updated successfully!" });

        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            await Menu.findByIdAndDelete({ _id: id })
            res.json({ msg: "data deleted successfully!" });

        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    }
}

module.exports = menuctr;