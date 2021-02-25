const { Router } = require('express');
const axios = require("axios");
const { conn, Temperament } = require("../db")
const { YOUR_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/dogs", (req, res) => {
    if (req.query.name) {
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`, {
            responseType: "json"
        })
            .then(resp => {
                if (resp.status == 200) {
                    res.send(resp.data.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase())).slice(0, 8).map(e => {
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
router.post("/dog", (req, res) => {
    res.send("work");
});


module.exports = router;
