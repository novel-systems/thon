import _axios from 'services/axios';

const UserProfilesService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

UserProfilesService.getPublicUserProfiles = userIds => {
    return _axios.get('/user-profiles/public/', {
        params: {
            userIds
        }
    });
};

UserProfilesService.getUserProfile = idToken => {
    return _axios.get('/user-profiles/', config(idToken));
};

UserProfilesService.createUserProfile = (data, idToken) => {
    return _axios.post('/user-profiles/', data, config(idToken));
};

UserProfilesService.updateUserProfile = (data, idToken) => {
    return _axios.patch('/user-profiles/', data, config(idToken));
};

UserProfilesService.getUsersByEmail = (email, idToken) => {
    return _axios.get('/user-profiles/search', { params: { email }, ...config(idToken) });
};

export default UserProfilesService;
