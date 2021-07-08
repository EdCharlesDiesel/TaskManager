export class SignUpViewModel
{
    personName: any;
    email: string;
    mobile: string;
    dateOfBirth: string;
    password: string;
    gender: string;
    countryID: number;
    receiveNewsLetters: boolean;
    skills: any;

    constructor(personName: any = null,
        email: string = '',
        mobile: string = '',
        dateOfBirth: string = '',
        password: string = '',
        gender: string = '',
        countryID: number = 0,
        receiveNewsLetters: boolean = false,
        skills: any = null,)
    {
        this.personName = personName;
        this.email = email;
        this.mobile = mobile;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender = gender;
        this.countryID = countryID;
        this.receiveNewsLetters = receiveNewsLetters;
        this.skills = skills;
    }
}
