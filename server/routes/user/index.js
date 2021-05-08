const express = require('express');
const router = express.Router();
const User = require('../../schema/user')

router.use(express.json());

router.post('/create', async (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(() => {
        res.status(201).send('saved to the database');
    })
    .catch((error) => {
        res.send('unable to saved to the database:' + error);
    });
});

router.get('/:id', async (req, res) => {
    try {
        const users = await User.find({ super_user_id: req.params.id });
        if (users) {
            return res.status(200).json(users);
        }
        return res.status(404).send('No data found');
    } catch (error) {
        res.status(502).send('Encountered server error:' + error);
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const users = await User.find({ _id: req.params.id });
        if (users) {
            return res.status(200).json(users);
        }
        return res.status(404).send('No data found');
    } catch (error) {
        res.status(502).send('Encountered server error:' + error);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, {...req.body});
        if (user) {
            const data = await User.find({ super_user_id: user.super_user_id });
            if (data) {
                return res.status(200).json(data);
            }
        }
        return res.status(404).send('No data to update');
    } catch (error) {
        res.status(502).send('Encountered server error:' + error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        if (user) {
            const data = await User.find({ super_user_id: user.super_user_id });
            if (data) {
                return res.status(200).json(data);
            }
        }
        return res.status(404).send('No data to delete');
    } catch (error) {
        res.status(502).send('Encountered server error:' + error);
    }
});


module.exports = router;