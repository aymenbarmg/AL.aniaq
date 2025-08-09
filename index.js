const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotification = functions.https.onRequest((req, res) => {
    const { title, body } = req.body;

    const message = {
        notification: { title, body },
        topic: "all"
    };

    admin.messaging().send(message)
        .then(response => {
            res.json({ success: true, response });
        })
        .catch(error => {
            res.status(500).json({ success: false, error });
        });
});
