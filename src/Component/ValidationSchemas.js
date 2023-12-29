import * as Yup from 'yup';

export const RegisterUserSchema = Yup.object({
    Name: Yup.string().required('Name is Required'),
    Username: Yup.string().required('User Name Type is Required'),
    Email: Yup.string().email().required('Email is Required'),
    Contact: Yup.number().required('Contact is Required'),
    Password: Yup.string().required('Password is Required'),
});

export const UserLoginSchema = Yup.object({
    Email: Yup.string().email().required('Email is Required'),
    Password: Yup.string().required('Password is Required'),
});


export const UserCategorySchema = Yup.object({
    CategoryName: Yup.string().required(' Name is Required'), 
})

export const RegisterBarndSchema = Yup.object({
    BrandName: Yup.string().required('Name is Required'),
    BrandIcon: Yup.string().required('Icon is Required'),
    UserEmail: Yup.string().email().required('Email is Required'),
    BrandCountry: Yup.string().required('Country is Required'),
    CategoryName: Yup.string().required('Category is Required'),
});


export const RegisterCoupanScehma= Yup.object({
    // ICON: Yup.string().required('ICON is Required'),
    WebURL: Yup.string().url().required('WEBURL is Required'),
    BrandName:Yup.string().required('Brandis Required'),
    StartDate: Yup.string().required('Start Date is Required'),
    ExpireDate: Yup.string().required('Expire Date is Required'),
    SaleAmount: Yup.number().positive().min(1).max(100).required('Sale Amount is Required'),
    CoupanName: Yup.string().required('Coupan Name is Required'),
    CoupanCode: Yup.string().required('Coupan COde is Required'),
    Month: Yup.string().required('Month is Required'),
    Event: Yup.string().required('Event is Required'),
    Category: Yup.string().required('Category is Required'),
});