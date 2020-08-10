export const CONTACT_CENTER_TASK_DROPDOWN_DATA = {
    'Client Inquiry': [
        'Distributed Inquiry',
        'Market Value',
        'Closing Account Status',
        'Closed Account Inquiry'
    ],
    'Client Contact': [
        'Client Returned Call',
        'Client Call For..',
        'Information not Disclosed'
    ],
    'Cash Transactions': [
        'ACH Disbursement',
        'Stop Payment/Re-Issue',
        'ACH Receipt'
    ],
    'General information': [
        'General Information request',
        'Multiple client request'
    ]
};

export const ASSIGN_TO_DROPDOWN_DATA = [
    'Team',
    'Individual',
    'Contact Center - WF.com'
];

export enum TaskState {
    ADD = 'ADD',
    EDIT = 'EDIT',
    REVIEW = 'REVIEW',
    VIEW = 'VIEW'
}
export const COMMUNICATION_DROPDOWN_DATA = {
    'Incoming Call': [
        'Incoming Call'
    ],
    'Outgoing Call': [
        'Outgoing Call'
    ],
    'Letter': [
        'Letter'
    ],
    'Email': [
        'Email',
    ],
    'Face to Face': [
        'Face to Face'
    ],
    'Notes': [
        'Misc',
        'Alert',
        'Other Notes'
    ]
};
export const AUDIT_COLUMNS = [
    { field: 'date', header: 'Date' },
    { field: 'user', header: 'User' },
    { field: 'auditType', header: 'Audit Type' },
    { field: 'action', header: 'Action' }
  ];
  export const AUDIT_FILTER_OPTIONS = [
    { name: 'Notes & Alerts'},
    { name: 'Documents'},
    { name: 'Emails' },
    { name: 'Workflow'},
    { name: 'Edits'},
    { name: 'View All' }
  ];
  