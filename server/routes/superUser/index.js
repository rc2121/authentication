const express = require('express');
const router = express.Router();
const SuperUser = require('../../schema/superUser')

router.use(express.json());
router.get('/', (req, res) => {
    res.send('This is super user rout')
})

router.post('/sign-up', (req, res) => {
    const user = new SuperUser(req.body);
    user.save()
    .then((data) => {
        res.status(201).json({ id: data._id });
    })
    .catch((error) => {
        res.send('unable to saved to the database:' + error);
    });
});

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await SuperUser.findOne({email: email, password: password });
        if (data) {
            return res.status(200).json({ id: data._id });
        }
        return res.status(401).send({msg: 'login failed'})
    } catch (error) {
        res.send('Error in signin with this user:' + error);
    }
});

module.exports = router;