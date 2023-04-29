const ContactMessage = require("../models/ContactMessage");

const getContactParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        title: body.title,
        issue: body.issue
    };
};

module.exports = {
    indexView: (req, res) => {
        res.render("contact/contact_us");
    },

    getMessages: async(req, res, next) => {
        if (!res.locals.loggedIn || !req.user.isAdmin){
            res.locals.contactMessages = [];
            next();
            return;
        }
        await ContactMessage.find({})
            .then((messages) => {
                res.locals.contactMessages = messages;
                next();
                return;
            })
            .catch((error) => {
                console.log(`Error fetching messages: ${error.message}`);
                res.locals.contactMessages = [];
                next();
                return;
            })
    },

    create: async(req, res) => {
        await ContactMessage.create(getContactParams(req.body)).then(() => {
            req.flash(
                "success",
                "Message successfully sent"
            );
            res.redirect("/contact")
        }).catch((err) => {
            console.log(err);
            req.flash(
                "error",
                "Error sending message"
            );
            res.redirect("/contact")
        });
    },

    validate: (redirectRoute, attachId = false) => { 
        return (req, res, next) => {
            notEmptyStrings = ['name', 'email', 'title', 'issue'];
            for (elem of notEmptyStrings){
                req.check(elem, `${elem} cannot be empty`).notEmpty();
            }
            req.check("email", "Email is invalid").isEmail();

            req.getValidationResult().then((error) => {
                if (!error.isEmpty()) {
                    let messages = error.array().map((e) => e.msg);
                    req.flash("error", messages.join(" and "));
                    const finalRedirectRoute = (attachId && req.body.id)? redirectRoute + "/" + req.body.id : redirectRoute
                    res.redirect(finalRedirectRoute);
                } else {
                    next();
                }
            });
        }
    },
}