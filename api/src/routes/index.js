const { Router } = require('express');
const axios = require("axios");
const { conn, Temperament, Dog } = require("../db");
const { YOUR_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/dogs", (req, res) => {
    if (req.query.name) {
        var result = [];
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`, {
            responseType: "json"
        })
            .then(resp => {
                if (resp.status == 200) {
                    Dog.findAll({
                        include: [{
                            model: Temperament
                        }]
                    })
                        .then(dbdata => {
                            result = result.concat(dbdata.map(e => ({
                                id: e.id,
                                image: e.image,
                                name: e.name,
                                temperament: e.temperaments.map(e => e.dataValues.name).join(", "),
                                weight: e.weight
                            })))
                            result = result.concat(resp.data.map(e => {
                                return {
                                    id: e.id,
                                    image: e.image.url,
                                    name: e.name,
                                    temperament: e.temperament || "",
                                    weight: e.weight.metric
                                }
                            }))
                            res.send(result.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase())));
                        })

                }
            })
    }
    else {
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`, {
            responseType: "json"
        })
            .then(resp => {
                if (resp.status == 200) {
                    res.send(resp.data.slice(0, 8).map(e => {
                        return {
                            id: e.id,
                            image: e.image.url,
                            name: e.name,
                            temperament: e.temperament,
                            weight: e.weight.metric
                        }
                    }));
                }
            })
    }
});
router.get("/dogs/:id", (req, res) => {
    if (req.params.id.length > 10) {
        Dog.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Temperament
            }]
        })
            .then(dbdata => {
                res.send([{
                    id: dbdata.id,
                    image: dbdata.image,
                    name: dbdata.name,
                    temperament: dbdata.temperaments.map(e => e.dataValues.name).join(", "),
                    weight: dbdata.weight,
                    height: dbdata.height,
                    years_of_life: dbdata.years_of_life
                }])
            })
    }
    else {
        axios.get(`https://api.thedogapi.com/v1/images/search?api_key=${YOUR_API_KEY}&breed_ids=${req.params.id}`, {
            responseType: "json"
        })
            .then(resp => {
                if (resp.status == 200) {
                    res.send(resp.data.map(e => {
                        return {
                            id: e.breeds[0].id,
                            image: e.url,
                            name: e.breeds[0].name,
                            temperament: e.breeds[0].temperament,
                            weight: e.breeds[0].weight.metric,
                            height: e.breeds[0].height.metric,
                            years_of_life: e.breeds[0].life_span
                        }
                    }));
                }
            })
    }
});
router.get("/temperament", (req, res) => {
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`, {
        responseType: "json"
    })
        .then(resp => {
            if (resp.status == 200) {
                const temperaments = [];
                resp.data.map(e => { return { temperament: e.temperament } }).forEach(e => {
                    if (e.temperament) {
                        e.temperament.split(", ").forEach(e => {
                            if (!temperaments.includes(e)) temperaments.push(e);
                        })
                    }
                });
                (async () => {
                    await conn.sync();
                    temperaments.forEach(async e => {
                        await Temperament.findOrCreate({
                            where: {
                                name: e
                            }
                        })
                    })
                    res.send(await Temperament.findAll({
                        attributes: ['id', 'name']
                    }))
                })();
            }
        })


});
router.post("/dog", async (req, res) => {
    const dog = await Dog.create({
        name: req.body.data.name,
        image: req.body.data.image,
        height: req.body.data.height,
        weight: req.body.data.weight,
        years_of_life: req.body.data.years_of_life
    });
    req.body.data.temperaments.forEach(async (e) => {
        Temperament.findOne({
            where: {
                name: e
            }
        })
            .then(async (temp) => {
                await dog.addTemperament(temp);
            })
    })
});


module.exports = router;
