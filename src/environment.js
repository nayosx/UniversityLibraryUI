const baseUrl = 'http://127.0.0.1:3000';
const api = `${baseUrl}/api/v1`;
const envi = {

    datatable: {
        max_text: 60,
        texts: {
            viewDetail: '...',
        }
    },

    toastConfig: {
        positionClass : 'toast-top-right',
        hideDuration: 300,
        timeOut: 4000,
        progressBar: true,
    },

    form: {
        texts: {
            errorServer: "Error on server",
        }
    },
    btn: {
        texts: {
            edit: "Edit",
            create: "Create",
            delete: "Delete",
            update: "Update",
            cancel: "Cancel",
            back: "Back to",
        }
    },
    pages: {
        login: {
            title: "Sing in",
            auth: `${baseUrl}/authenticate`,
            texts: {
                errorServer: 'Server Error',
                errorCredentials: 'Invalid credentials',
                btnLogin: "Sign in",
                btnLoginPleaseWaiting: "Please waiting"
            },
            defaultObj: { email: 'pacoelchato@mail.com', password: 'k1r@' },
        },
        student: {
            id: 1,
            title: "Students",
            search: {
                title: "Search books",
                url: `${api}/books`,
                texts: {
                    no_match: "Is not find any book",
                    validName: `Invalid params for search`,
                    nameRequired: "The search is required",
                },
                defaultObj: {
                    search: '',
                    searchType: 'title'
                }
            },
            shoppinCart: {
                title: "List of books",
                url: `${api}/books`,
                texts: {
                    no_match: "Is not find any book"
                }
            },
        },
        librarian: {
            id: 2,
            title: "Librarian",
            authors: {
                title: "Authors",
                single: "Author",
                url: `${api}/authors`,
                texts: {
                    validName: `Invalid name author`,
                    nameRequired: "The name for author is required",
                    deafultBio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    
                    deleteWarning: "Warning!!!",
                    deleteInfo: "are you sure you want to delete the author",
                    deleteConfirmBtn: "Yes, delete it!",
                    deleteCancelled: "Cancelled",
                    deleteCancelledText: "Your author is not deleted",
                    deleteSucces: "Deleted!",
                    deleteSuccesText: "Your author has been deleted.",
                },
                defaultObj: { name: '', bio: '' },
                propNameToChange: 'bio',
            },
            books: {
                title: "Books",
                single: "Book",
                url: `${api}/books`,
                texts: {
                    validName: "Invalid name for gender",
                    nameRequired: "The name for gender is required",
                    defaultDesc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                    deleteWarning: "Warning!!!",
                    deleteInfo: "are you sure you want to delete the book",
                    deleteConfirmBtn: "Yes, delete it!",
                    deleteCancelled: "Cancelled",
                    deleteCancelledText: "Your book is not deleted",
                    deleteSucces: "Deleted!",
                    deleteSuccesText: "Your book has been deleted.",
                },
                defaultObj: {
                    isbn: '',
                    title: '',
                    year: 2021,
                    totalPage: 0,
                    stock: 0,
                    stockActual: 0,
                    description: ''
                },
                propNameToChange: 'description',
            },
            genders: {
                title: "Genders",
                single: "Gender",
                url: `${api}/genders`,
                texts: {
                    validName: "Invalid name for gender",
                    nameRequired: "The name for gender is required",
                    defaultDesc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    
                    deleteWarning: "Warning!!!",
                    deleteInfo: "are you sure you want to delete the gender",
                    deleteConfirmBtn: "Yes, delete it!",
                    deleteCancelled: "Cancelled",
                    deleteCancelledText: "Your gender is not deleted",
                    deleteSucces: "Deleted!",
                    deleteSuccesText: "Your gender has been deleted.",
                },
                defaultObj: { name: '', description: '' },
                propNameToChange: 'description',
            },
            loans: {
                title: "Loans",
                single: "Loan",
                url: `${api}/loans`,
                texts: {
                    validName: "Invalid name for gender",
                    nameRequired: "The name for gender is required",
                    defaultDesc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    
                    deleteWarning: "Warning!!!",
                    deleteInfo: "are you sure you want to delete the gender",
                    deleteConfirmBtn: "Yes, delete it!",
                    deleteCancelled: "Cancelled",
                    deleteCancelledText: "Your gender is not deleted",
                    deleteSucces: "Deleted!",
                    deleteSuccesText: "Your gender has been deleted.",
                },
                defaultObj: {},
                propNameToChange: '',
            },
            students: {
                title: "Students",
                single: "Student",
                url: `${api}/users`,
                texts: {
                    validName: "Invalid name for gender",
                    nameRequired: "The name for gender is required",
                    defaultDesc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    
                    deleteWarning: "Warning!!!",
                    deleteInfo: "are you sure you want to delete the gender",
                    deleteConfirmBtn: "Yes, delete it!",
                    deleteCancelled: "Cancelled",
                    deleteCancelledText: "Your gender is not deleted",
                    deleteSucces: "Deleted!",
                    deleteSuccesText: "Your gender has been deleted.",
                },
                defaultObj: {
                    rol_id: 0,
                    name: '',
                    lastname: '',
                    email: '',
                    phone: '',
                },
                propNameToChange: '',
            }
        },
    }
};
export {envi};