const baseUrl = 'http://localhost:3000';
const envi = {
    pages: {
        login: {
            auth: `${baseUrl}/authenticate`,
            texts: {
                errorServer: 'Server Error',
                errorCredentials: 'Invalid credentials'
            }
        },
        student: {
            id: 1,
        },
        librarian: {
            id: 2,
        }
    }
};
export {envi};