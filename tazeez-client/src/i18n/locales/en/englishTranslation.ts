import { namespaces } from "../../i18n.constants";
import translationKeys from "../translationKeys";

const englishTranslation = {
  [namespaces.common]: {
    buttons: {
      ok: "Ok",
      cancel: "Cancel",
    },
    [translationKeys.common.homePage]: "Home Page",
    [translationKeys.common.about]: "About",
  },
  [namespaces.pages.home]: {
    welcome: "Welcome",
  },
  [namespaces.pages.login]: {
    signIn: "Sign In",
    home: "Home",
    createAccount: "Didn't you account yet?",
    signUp: "Sign Up Here",
    enterEmail: "Enter email",
    enterPassword: "Enter Password",
    [translationKeys.pages.login.homePage]: "Home",
    [translationKeys.pages.login.enterFirstName]: "Last Name",
    [translationKeys.pages.login.enterLastName]: "First Name",
    [translationKeys.pages.login.alreadyAccount]: "Already have an account?",
  },
  [namespaces.pages.authNavbar]: {
    [translationKeys.pages.authNavbar.homePage]: "Home Page",
    [translationKeys.pages.authNavbar.about]: "About",
    [translationKeys.pages.authNavbar.blog]: "Blog",
    [translationKeys.pages.authNavbar.contact]: "Contact",
    [translationKeys.pages.authNavbar.doctors]: "Doctors",
    [translationKeys.pages.authNavbar.services]: "Services",
  },
  [namespaces.template]: {
    [translationKeys.template.add]: "Add New Template",
    [translationKeys.template.save]: "Save",
    [translationKeys.template.close]: "Close",
    [translationKeys.template.title]: "Title",
    [translationKeys.template.q]: "Q",
  },
  [namespaces.question]: {
    [translationKeys.question.add]: "Add New Question",
    [translationKeys.question.save]: "Save",
    [translationKeys.question.close]: "Close",
    [translationKeys.question.delete]: "Delete",
    [translationKeys.question.choice]: "Choice",
    [translationKeys.question.questionName]: "Question Name",
    [translationKeys.question.score]: "Score",
    [translationKeys.question.order]: "Order",
    [translationKeys.question.yes]: "Yes",
    [translationKeys.question.no]: "No",
    [translationKeys.question.isOptional]: "Is Optional",
    [translationKeys.question.optional]: "Optional",
    [translationKeys.question.mustChoice]: "You must add choices",
    [translationKeys.question.questions]: "Questions",
    [translationKeys.question.available]: "No Questions available!",
    [translationKeys.question.lastUpdated]: "Last Updated",
    [translationKeys.question.created]: "Created",
    [translationKeys.question.questionType]: "Question Type",
  },
  [namespaces.profile]: {
    [translationKeys.profile.firstName]: "First Name",
    [translationKeys.profile.lastName]: "last Name",
    [translationKeys.profile.email]: "Email",
    [translationKeys.profile.city]: "City",
    [translationKeys.profile.phoneNumber]: "Phone Number",
    [translationKeys.profile.contactInformation]: "Contact information",
    [translationKeys.profile.editProfile]: "Edit Profile",
    [translationKeys.profile.userInformation]: "User information",
    [translationKeys.profile.myProfile]: "My Profile",
    [translationKeys.profile.logOut]: "Log Out",
  },
  [namespaces.doctor]: {
    [translationKeys.doctor.name]: "Name",
    [translationKeys.doctor.save]: "Save",
    [translationKeys.doctor.close]: "Close",
    [translationKeys.doctor.lastUpdated]: "Last Updated",
    [translationKeys.doctor.created]: "Created",
    [translationKeys.doctor.email]: "Email",
    [translationKeys.doctor.description]: "Description",
    [translationKeys.doctor.users]: "Users",
    [translationKeys.doctor.specialist]: "Specialist",
    [translationKeys.doctor.phoneNumber]: "Phone Number",
    [translationKeys.doctor.city]: "City",
    [translationKeys.doctor.available]: "No Doctors available!",
    [translationKeys.doctor.doctors]: "Doctors",
    [translationKeys.doctor.delete]: "Delete",
    [translationKeys.doctor.deleteMassage]:
      "Do you want to delete this Doctor?",
    [translationKeys.doctor.deleteDoctor]: "Delete Doctor",
    [translationKeys.doctor.addDoctor]: "Add New Doctor",
    [translationKeys.doctor.editDoctor]: "Edit Doctor",
  },
};

export default englishTranslation;
