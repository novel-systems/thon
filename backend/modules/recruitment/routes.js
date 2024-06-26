const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@novel-systems/shared')
const RecruitmentController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')

const queryUsers = asyncHandler(async (req, res) => {
    const users = await RecruitmentController.queryProfiles(req.body, req.auth)
    return res.status(200).json(users)
})

const getUserProfileRecruitment = asyncHandler(async (req, res) => {
    const userProfile = await RecruitmentController.getRecruitmentProfile(
        req.params.id,
        req.auth.sub,
    )
    return res.status(200).json(userProfile)
})

const getRecruiterActions = asyncHandler(async (req, res) => {
    console.log('getRecruiterActions', req.params)
    const actionHistory = await RecruitmentController.getRecruiterActions(
        req.auth,
        req.params.organisation,
    )
    return res.status(200).json(actionHistory)
})

const saveRecruiterAction = asyncHandler(async (req, res) => {
    console.log(req.auth, req.body)
    const actionHistory = await RecruitmentController.saveRecruiterAction(
        req.auth,
        req.body,
    )
    return res.status(200).json(actionHistory)
})

router.post(
    '/search',
    hasToken,
    hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
    queryUsers,
)

router
    .route('/profile/:id')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        getUserProfileRecruitment,
    )

router
    .route('/action')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        getRecruiterActions,
    )
    .post(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        saveRecruiterAction,
    )

router
    .route('/action/:organisation')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        getRecruiterActions,
    )

module.exports = router
