import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Login success',
            user: req.user
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'Login failed'
    })
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.session.destroy((err) => {
            res.clearCookie('connect.sid')

            res.json({
                status: 'logout',
                user: {}
            })
        })
    })
})

router.get('/github',
    passport.authenticate('github', {
        scope: [ 'read:user' ]
    })
)

router.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: 'http://localhost:5173/dashboard',  // direct to ehh?
        failureRedirect: 'http://localhost:5173/' // redirect to landing page?
    })
)

export default router