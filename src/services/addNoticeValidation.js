import * as Yup from 'yup';

export const stepOneValidationSchema = Yup.object({
  title: Yup.string()
    .label('Title')
    .required('Title is required')
    .matches(/^[a-zA-Z\s]+\.?$/iu, 'Only Latin letters'),
  name: Yup.string()
    .label('Name')
    .required('Name is required')
    .matches(/^[a-zA-Z]+$/, 'Only Latin letters no space'),
  dateOfBirth: Yup.string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      'Correct format: dd.mm.yyyy'
    )
    .test(
      'is-date-valid',
      () => `Future date not allowed`,
      (value) => {
        if (value) {
          let date = value.split('.');
          const corectFormat = new Date(`${date[2]}/${date[1]}/${date[0]}`);
          return corectFormat.getTime() < Date.now();
        }
        return true;
      }
    )
    .label('Date of birth')
    .required('Date of birth is required'),
  // Yup.date()
  //   .typeError('Date format: dd.mm.yyyy')
  //   .max(new Date(), 'Enter valid date')
  breed: Yup.string()
    .label('Breed')
    .required('Breed is required')
    .matches(/^[a-zA-Z\s]+$/iu, 'Only Latin letters')
});

export const stepTwoValidationSchema = Yup.object({
  location: Yup.string()
    .required('Location is required')
    .label('Location')
    .matches(/^[a-zA-Z]+,\s[a-zA-Z]+$/iu, 'Format: City, Region'),
  price: Yup.string()
    .label('Price')
    .matches(/^[1-9][0-9]*$/, 'Not start with 0')
    .label('Price'),
  comments: Yup.string().min(8, 'Too Short!').max(120, 'Too Long!').label('Comment').required('Comments is required'),
  petImage: Yup.mixed().label('Pet image').required('Pet image is required')
});
