
export const Routes = {
    // pages
    Signin: { path: "/" },
    Signup: { path: "/auth/sign-up" },
    ForgotPassword: { path: "/auth/forgot-password" },
    ResetPassword: { path: "/auth/reset-password" },

    Lock: { path: "/default/lock" },
    NotFound: { path: "/default/404" },
    ServerError: { path: "/default/500" },

    //pages

    //student
    Student: {path: "/student"},
    StudentCart: {path: "/student/cart"},

    //librarian
    Authors: {path: "/authors"},
    Books: {path: "/books"},
    Genders: {path: "/genders"},
    Loans: {path: "/loans"},
    Students: {path: "/students"},
};