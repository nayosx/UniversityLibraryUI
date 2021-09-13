
export const Routes = {
    // pages
    Signin: { path: "/" },
    Signup: { path: "/auth/sign-up" },
    ForgotPassword: { path: "/auth/forgot-password" },
    ResetPassword: { path: "/auth/reset-password" },

    Lock: { path: "/default/lock" },
    NotFound: { path: "/default/404" },
    ServerError: { path: "/default/500" },
    UnauthorizedPage: {path: "/default/401"},

    //pages

    //student
    Student: {path: "/student"},
    StudentCart: {path: "/student/cart"},

    //librarian
    Authors: {path: "/authors"},
    AuthorCreateOrEdit: {path: "/authors/:id"},
    
    Books: {path: "/books"},
    BookCreateOrEdit: {path: "/books/:id"},

    Genders: {path: "/genders"},
    GenderCreateOrEdit: {path: "/genders/:id"},

    Loans: {path: "/loans"},
    LoanDetail: {path: "/loans/:id"},

    Students: {path: "/StudentList"},
    StudentCreateOrEdit: {path: "/StudentList/:id"},
};