const RegistrationStatuses = {
    pending: {
        id: 'pending',
        label: 'Pending',
        description: 'Waiting for acceptance/rejection',
        color: '#555555',
        allowAssign: true,
        allowEdit: true
    },
    softAccepted: {
        id: 'softAccepted',
        label: 'Soft Accepted',
        description: 'Accepted, but has not been notified yet',
        color: '#99d068',
        allowAssign: true,
        allowEdit: true
    },
    softRejected: {
        id: 'softRejected',
        label: 'Soft Rejected',
        description: 'Rejected, but has not been notified yet',
        color: '#CD5C5C',
        allowAssign: true,
        allowEdit: true
    },
    accepted: {
        id: 'accepted',
        label: 'Accepted',
        description: 'Accepted and has been notified about it',
        color: '#33d068',
        allowAssign: false,
        allowEdit: false
    },
    rejected: {
        id: 'rejected',
        label: 'Rejected',
        description: 'Rejected and has been notified about it',
        color: '#e2062c',
        allowAssign: false,
        allowEdit: false
    },
    confirmed: {
        id: 'confirmed',
        label: 'Confirmed',
        description: 'Has confirmed their participation',
        color: '#ffc60a',
        allowAssign: false,
        allowEdit: false
    },
    checkedIn: {
        id: 'checkedIn',
        label: 'Checked In',
        description: 'Has arrived at the event',
        color: '#0083f3',
        allowAssign: false,
        allowEdit: false
    },
    noShow: {
        id: 'noShow',
        label: 'No-Show',
        description: 'Did not arrive at the event before it ended',
        color: '#ff7c0c',
        allowAssign: false,
        allowEdit: false
    }
};

module.exports = {
    ids: Object.keys(RegistrationStatuses),
    asObject: RegistrationStatuses,
    asArray: Object.keys(RegistrationStatuses).map(status => RegistrationStatuses[status])
};
